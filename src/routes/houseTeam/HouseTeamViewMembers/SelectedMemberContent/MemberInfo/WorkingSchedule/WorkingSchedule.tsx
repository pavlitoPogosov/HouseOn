import React, { useState } from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import { EDatepickerCalendarTypes, IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { DatepickerInput } from 'common/components/ui/DatepickerInput/DatepickerInput';
import { MonthSchedule } from 'common/components/ui/MonthSchedule/MonthSchedule';
import { WorkingPeriodCell, WorkingPeriodCellTypes } from 'common/components/ui/WorkingPeriodCell/WorkingPeriodCell';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { AccountScheduleType, WeekDaysEnum } from 'graphql/types';
import { DatepickerDay } from 'utils/dates';

import s from './WorkingSchedule.module.scss';

export interface IWorkingScheduleProps {
  schedules: AccountScheduleType[] | [];
}

export const WorkingSchedule: React.FC<IWorkingScheduleProps> = ({ schedules }) => {
  const shouldAdapt = useMediaQuery('(max-width: 576px)');

  const datepickerToggler = useToggle();
  const [date, setDate] = useState<IDatepickerValue>({
    endDate: null,
    isChosenMonth: true,
    startDate: moment()
  });

  const renderWorkingScheduleCell = (d: DatepickerDay) => {
    let text: string | undefined;
    let type: WorkingPeriodCellTypes;
    const day: WeekDaysEnum = d.fullDate.format('dddd').toUpperCase() as WeekDaysEnum;
    const schedule = schedules.find(({ weekday }) => weekday === day);
    if (schedule) {
      text = `${schedule?.start_time?.format('h:mm a')} 
      - ${schedule?.end_time?.format('h:mm a')}`;
      type = WorkingPeriodCellTypes.WORK_DAY;
    } else {
      type = WorkingPeriodCellTypes.EMPTY;
    }
    return (
      <WorkingPeriodCell
        cell={{
          text,
          type
        }}
        containerClassName={s.WorkingSchedule__cell}
      />
    );
  };

  return (
    <>
      <div className={s.WorkingSchedule__datepicker}>
        <DatepickerInput
          containerClassName={clsx(s.WorkingSchedule__dateInput, shouldAdapt && s.mobile)}
          disabledCalendars={[EDatepickerCalendarTypes.MONTH]}
          enableSwap
          isOpen={datepickerToggler.value}
          onChange={setDate}
          onClose={datepickerToggler.unset}
          onOpen={datepickerToggler.set}
          value={date}
        />
      </div>

      <MonthSchedule currentDate={date.startDate} renderCell={renderWorkingScheduleCell} shouldAdapt={shouldAdapt} />
    </>
  );
};
