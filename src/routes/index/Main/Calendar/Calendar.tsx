import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';
// eslint-disable-next-line
import moment from 'moment';
// eslint-disable-next-line
import { useToggle } from '@proscom/ui-react';

import { EDatepickerCalendarTypes, IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { DatepickerInput } from 'common/components/ui/DatepickerInput/DatepickerInput';
import { UsualTabs, IUsualTab } from 'common/components/ui/Tabs';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { IWorkingPeriodCell, WorkingPeriodCellTypes } from 'common/components/ui/WorkingPeriodCell/WorkingPeriodCell';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { useRangeDatepicker } from 'common/hooks/useRangeDatepicker';
import { useGetHouseQuery } from 'graphql/hooks/house';
import { QUERY_HOUSE_EVENTS_PAGE } from 'graphql/queries/events';
import { QUERY_SCHEDULES } from 'graphql/queries/schedules';
import {
  AccountFilterInput,
  AccountRolesEnum,
  AccountType,
  EventSortingFieldsEnum,
  HouseEventPageInput,
  HouseEventsPageType,
  SortingDirectionEnum
} from 'graphql/types';
import { getCurrentWeekDays } from 'utils/dates';
import { getAmpluaName } from 'utils/houseTeam';

import { EmptyEventsWarning } from './EmptyWarning/EmptyEventsWarning';
import { Events } from './Events/Events';
import { HouseTeam } from './HouseTeam/HouseTeam';

import s from './Calendar.module.scss';

type TWorkingPeriodCell = IWorkingPeriodCell & { date: string };
type TWorkingPeriodCells = TWorkingPeriodCell[];

export type TCalendarScheduleRow = {
  cells: TWorkingPeriodCells;
  employee: {
    img?: string | null;
    job: string;
    name: string;
  };
  id: string;
};

enum ECalendarTypes {
  EVENTS = 'Events',
  HOUSE_TEAM = 'House Team'
}

const TABS: IUsualTab[] = [
  { text: ECalendarTypes.EVENTS, value: ECalendarTypes.EVENTS },
  { text: ECalendarTypes.HOUSE_TEAM, value: ECalendarTypes.HOUSE_TEAM }
];

export const Calendar: React.FC<unknown> = () => {
  const intl = useIntl();

  const { data: house, loading: loadingHouse } = useGetHouseQuery();
  const { data: members } = useQueryWithError<{ result: AccountType[] }, { input: AccountFilterInput }>(
    QUERY_SCHEDULES,
    {
      variables: {
        input: {
          is_deactivated: false,
          is_pending_invite: false,
          roles: [AccountRolesEnum.Worker]
        }
      }
    }
  );

  const [activeCalendar, setActiveCalendar] = useState<string>(ECalendarTypes.EVENTS);

  const handleCalendarChange = (activeTab: string) => {
    setActiveCalendar(activeTab);
  };

  const currentWeekDays = getCurrentWeekDays();

  const datepickerToggler = useToggle();

  const {
    appliedValue: eventsAppliedValue,
    onChangeValue: onChangeEventsValue,
    onClosePicker: onCloseEventsPicker,
    shownValue: eventsShownValue
  } = useRangeDatepicker({
    endDate: currentWeekDays[currentWeekDays.length - 1],
    isChosenMonth: false,
    startDate: currentWeekDays[0]
  });

  const {
    data: events,
    loading: loadingEvents,
    refetch: refetchEvents
  } = useQueryWithError<{ result: HouseEventsPageType }, { input: HouseEventPageInput }>(QUERY_HOUSE_EVENTS_PAGE, {
    variables: {
      input: {
        filter: {
          ends_at: eventsAppliedValue.endDate
            ?.clone()
            .utcOffset(0)
            .set({
              hour: 0,
              minute: 0,
              second: 0
            })
            .add(2, 'days'),
          starts_at: eventsAppliedValue.startDate
            .clone()
            .utcOffset(0)
            .add(1, 'days')
            .set({
              hour: 0,
              minute: 0,
              second: 0
            })
            .subtract(1, 'minutes')
        },
        sorting: [{ direction: SortingDirectionEnum.Asc, field: EventSortingFieldsEnum.StartsAt }]
      }
    }
  });

  const isEmptyEvents = Boolean(!loadingEvents && !loadingHouse && !house?.result.count_events);

  useEffect(() => {
    refetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [houseTeamValue, setHouseTeamValue] = useState<IDatepickerValue>({
    endDate: currentWeekDays[currentWeekDays.length - 1],
    isChosenMonth: false,
    startDate: currentWeekDays[0]
  });

  const isBelowMd = useMediaQuery('(max-width: 767px)');
  const isEventsTab = activeCalendar === ECalendarTypes.EVENTS;

  const { endDate, startDate } = houseTeamValue;
  const daysDiff = endDate?.diff(startDate, 'days');
  const daysLength = daysDiff ? daysDiff + 1 : 1;

  const rows: TCalendarScheduleRow[] =
    members?.result?.map((account) => ({
      cells:
        (Array(daysLength)
          .fill(null)
          ?.map((_, i) => {
            const dayDate = moment(startDate).add(i, 'day');
            const weekDay = dayDate.format('dddd');
            const scheduleDay = account.schedules?.find((d) => d.weekday.toLowerCase() === weekDay.toLowerCase());
            const date = dayDate.format('ddd MMM DD YYYY');

            if (!scheduleDay) {
              return {
                date,
                type: WorkingPeriodCellTypes.DAY_OFF
              };
            }
            const timeStart = scheduleDay.start_time ? scheduleDay.start_time.format('h:mm a') : '';
            const timeEnd = scheduleDay.end_time ? scheduleDay.end_time.format('h:mm a') : '';

            return {
              date,
              text: `${timeStart} - ${timeEnd}`,
              type: WorkingPeriodCellTypes.WORK_DAY
            };
          })
          .filter((d) => d !== undefined) as TWorkingPeriodCells) || [],
      employee: {
        img: null,
        job: getAmpluaName(account.amplua || '', intl),
        name: account.name || ''
      },
      id: account.id
    })) || [];

  const DatepickerComponent = () => {
    if (isEventsTab) {
      return (
        <DatepickerInput
          canSelectOnlyRange
          containerClassName={isEmptyEvents ? s.Calendar__disabledDatepicker : undefined}
          disabledCalendars={[EDatepickerCalendarTypes.YEAR]}
          enableSwap
          isOpen={datepickerToggler.value}
          onChange={onChangeEventsValue}
          onClose={onCloseEventsPicker(() => datepickerToggler.unset())}
          onOpen={datepickerToggler.set}
          value={eventsShownValue}
        />
      );
    }

    return (
      <DatepickerInput
        canSelectOnlyRange
        disabledCalendars={[EDatepickerCalendarTypes.YEAR]}
        enableSwap
        isOpen={datepickerToggler.value}
        onChange={setHouseTeamValue}
        onClose={datepickerToggler.unset}
        onOpen={datepickerToggler.set}
        value={houseTeamValue}
      />
    );
  };

  const ContentComponent = useCallback(() => {
    if (isEventsTab) {
      return (
        <Events
          currentDate={eventsAppliedValue}
          events={events?.result}
          isEmpty={isEmptyEvents}
          isLoading={loadingEvents}
        />
      );
    }

    return <HouseTeam datepickerCmp={isBelowMd && <DatepickerComponent />} rows={rows} shouldAdapt={isBelowMd} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEventsTab, isEmptyEvents, eventsAppliedValue, isBelowMd, rows, isBelowMd]);

  return (
    <div className={s.Calendar__container}>
      <div className={clsx(s.Calendar__header, !isBelowMd && isEventsTab && s.marginBottom)}>
        <Text as="h4" className={s.Calendar__title} text="Calendar" variant={TextPropsVariantsEnum.H3} />

        <div className={s.Calendar__controls}>
          {!isBelowMd && !isEmptyEvents && <DatepickerComponent />}

          {!!members?.result.length && (
            <UsualTabs
              containerClassName={s.Calendar__tabs}
              onChange={handleCalendarChange}
              tabs={TABS}
              value={activeCalendar}
            />
          )}
        </div>
      </div>

      {isBelowMd && isEventsTab && (
        <div className={s.Calendar__datepickerContainer}>
          <DatepickerComponent />
        </div>
      )}

      {isEmptyEvents && isEventsTab && <EmptyEventsWarning />}

      <ContentComponent />
    </div>
  );
};
