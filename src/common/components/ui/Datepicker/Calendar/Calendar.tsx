import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

import {
  DatepickerDay,
  DatepickerMonth,
  getMonthsForCurrentYear,
  getValueOnDayChoose,
  getDaysForCurrentMonth
} from 'utils/dates';

import { EDatepickerCalendarTypes, IDatepickerValue } from '../Datepicker';

import s from './Calendar.module.scss';

export interface CalendarProps {
  activeType: EDatepickerCalendarTypes;
  disabledFromDate?: moment.Moment;
  disabledTillDate?: moment.Moment;
  isMultiple: boolean;
  maxRangeInDays: number;
  onChange: (value: IDatepickerValue) => void;
  shownDate: moment.Moment;

  value: IDatepickerValue;
}
// TODO add hover animation
export const Calendar: React.FC<CalendarProps> = ({
  activeType,
  disabledFromDate,
  disabledTillDate,
  isMultiple,
  maxRangeInDays,
  onChange,
  shownDate,
  value
}) => {
  const isMonth = activeType === EDatepickerCalendarTypes.MONTH;
  const isYear = activeType === EDatepickerCalendarTypes.YEAR;

  const onChooseMonth = (month: DatepickerMonth) => {
    return () => {
      onChange({
        endDate: null,
        isChosenMonth: true,
        startDate: moment().set('month', month.order).set('year', shownDate.year()).startOf('month')
      });
    };
  };

  const onChooseDay = (day: DatepickerDay) => {
    return () => {
      onChange(
        getValueOnDayChoose({
          isMultiple,
          maxRangeInDays,
          newValue: day.fullDate,
          value
        })
      );
    };
  };

  const renderContent = () => {
    if (isMonth) {
      return (
        <div className={s.Calendar__container}>
          {getDaysForCurrentMonth(shownDate).map((d, i) => {
            const isSelectedStart = value.startDate.isSame(d.fullDate, 'date');
            const isSelectedEnd = value.endDate?.isSame(d.fullDate, 'date');

            const isBetween =
              d.fullDate.isBetween(value.startDate, value.endDate, 'date', '[]') ||
              d.fullDate.isBetween(value.endDate, value.startDate, 'date', '[]');

            const isEndBeforeStart = value.endDate?.isBefore(value.startDate);

            let isDisabled = false;

            if (disabledTillDate) {
              isDisabled = d.fullDate.isSameOrBefore(disabledTillDate);
            }

            if (disabledFromDate) {
              isDisabled = d.fullDate.isSameOrAfter(disabledTillDate);
            }

            return (
              <div
                className={clsx(s.Calendar__dayCell, {
                  [s.otherMonth]: d.isOtherMonth,
                  [s.active]: isSelectedStart || isSelectedEnd,
                  [s.between]: isBetween && !isSelectedStart && !isSelectedEnd,
                  [s.activeStart]: isEndBeforeStart ? isSelectedEnd : isSelectedStart && value.endDate,
                  [s.activeEnd]: isEndBeforeStart ? isSelectedStart : isSelectedEnd,
                  [s.disabled]: isDisabled
                })}
                key={i}
                onClick={!isDisabled ? onChooseDay(d) : undefined}
              >
                {d.text}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <>
        {getMonthsForCurrentYear(shownDate.year()).map((m, i) => (
          <div
            className={clsx(s.Calendar__monthCell, {
              [s.active]:
                value.isChosenMonth && m.year === value.startDate.year() && m.order === value.startDate.month()
            })}
            key={i}
            onClick={onChooseMonth(m)}
          >
            {m.text}
          </div>
        ))}
      </>
    );
  };

  return (
    <div
      className={clsx(s.Calendar__container, s.marginTop, {
        [s.month]: isMonth,
        [s.year]: isYear
      })}
    >
      {renderContent()}
    </div>
  );
};
