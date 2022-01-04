import { chunk } from 'lodash';
// eslint-disable-next-line
import moment from 'moment';
// eslint-disable-next-line
import { EMDASH } from '@proscom/ui-utils';

import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { IWeekControl } from 'common/components/ui/WeekControl/WeekControl';

export interface DatepickerDay {
  fullDate: moment.Moment;
  isOtherMonth?: boolean;
  text: string;
}

export interface DatepickerMonth {
  order: number;
  text: string;
  year: number;
}

const getDaysArrayFromMoment = (date: moment.Moment) =>
  Array.from(Array(date.daysInMonth()).keys()).map((d) => String(d + 1));

const getMonthDays = (days: string[], date: moment.Moment, isOtherMonth?: boolean): DatepickerDay[] =>
  days.map((d) => ({
    fullDate: moment(date).set('date', Number(d)),
    isOtherMonth,
    text: d
  }));

export const getDaysForCurrentMonth = (date: moment.Moment): DatepickerDay[] => {
  // 35 days should be in total
  let daysToReturnLeft = 35;

  const daysInCurrentMonth = getMonthDays(getDaysArrayFromMoment(date), date, false);

  daysToReturnLeft = daysToReturnLeft - daysInCurrentMonth.length;

  const daysToPickInNextMonth = Math.ceil(daysToReturnLeft / 2);
  const daysToPickInPrevMonth = daysToReturnLeft - daysToPickInNextMonth;

  const prevMonth = moment(date).subtract(1, 'months');
  const nextMonth = moment(date).add(1, 'months');

  const daysInPrevMonth = getMonthDays(
    getDaysArrayFromMoment(prevMonth).slice(-Number(daysToPickInPrevMonth)),
    prevMonth,
    true
  );
  const daysInNextMonth = getMonthDays(
    getDaysArrayFromMoment(nextMonth).slice(0, Number(daysToPickInNextMonth)),
    nextMonth,
    true
  );

  return [...daysInPrevMonth, ...daysInCurrentMonth, ...daysInNextMonth];
};

export const getMonthsForCurrentYear = (year: number): DatepickerMonth[] => {
  return moment.monthsShort().map((m, i) => ({
    order: i,
    text: m,
    year
  }));
};

export const setDefaultInputText = ({ endDate, isChosenMonth, startDate }: IDatepickerValue) => {
  if (isChosenMonth) {
    return startDate.format('MMMM, YYYY');
  }

  if (startDate.isSame(endDate, 'month')) {
    return `${startDate.format('DD')} ${EMDASH} ${endDate?.format('DD MMMM, YYYY')}`;
  }

  return `${startDate.format('MMMM DD')}${endDate ? endDate.format(` ${EMDASH} MMMM DD`) : ''}, ${startDate.format(
    'YYYY'
  )}`;
};

export const getRightValuesOnSwap = (value: IDatepickerValue, isPrev: boolean): IDatepickerValue => {
  const operation: 'subtract' | 'add' = isPrev ? 'subtract' : 'add';

  if (value.isChosenMonth) {
    return {
      endDate: null,
      isChosenMonth: true,
      startDate: moment(value.startDate)[operation](1, 'month').startOf('month')
    };
  }

  if (!value.endDate) {
    return {
      endDate: null,
      startDate: moment(value.startDate)[operation](1, 'day')
    };
  }

  const diffInDays = Math.abs(value.startDate.diff(value.endDate, 'days')) + 1;
  return {
    endDate: moment(value.endDate)[operation](diffInDays, 'days'),
    startDate: moment(value.startDate)[operation](diffInDays, 'days')
  };
};

export const getCurrentWeekDays = (): moment.Moment[] => {
  const currentWeekStart = moment().startOf('week');

  const weekDays: moment.Moment[] = [];

  for (let i = 0; i <= 6; i++) {
    weekDays.push(currentWeekStart.clone().add(i, 'days'));
  }

  return weekDays;
};

export const getDaysForMonthSchedule = (
  currentDate: moment.Moment,
  includeOtherMonths?: boolean
): DatepickerDay[][] => {
  const currentMonthDays = getMonthDays(getDaysArrayFromMoment(currentDate), currentDate);
  const daysToPrevSunday = currentDate.clone().startOf('month').weekday();
  const daysToPickFromNextMonth = 42 - currentMonthDays.length - daysToPrevSunday;

  const prevMonthDays: DatepickerDay[] = [];
  const nextMonthDays: DatepickerDay[] = [];

  if (includeOtherMonths) {
    for (let i = daysToPrevSunday; i > 0; i--) {
      const fullDate = currentDate.clone().startOf('month').subtract(i, 'days');

      prevMonthDays.push({
        fullDate,
        isOtherMonth: true,
        text: fullDate.format('D')
      });
    }

    for (let i = 1; i <= daysToPickFromNextMonth; i++) {
      const fullDate = currentDate.clone().endOf('month').add(i, 'days');

      nextMonthDays.push({
        fullDate,
        isOtherMonth: true,
        text: fullDate.format('D')
      });
    }
  }

  return chunk([...prevMonthDays, ...currentMonthDays, ...nextMonthDays], 7);
};

type GetValueOnDayChooseOptionsType = {
  isMultiple?: boolean;
  maxRangeInDays: number;
  newValue: moment.Moment;
  value: IDatepickerValue;
};

export const getValueOnDayChoose = ({
  isMultiple,
  maxRangeInDays,
  newValue,
  value
}: GetValueOnDayChooseOptionsType) => {
  if (isMultiple) {
    if (value.endDate) {
      return {
        endDate: null,
        isChosenMonth: false,
        startDate: newValue
      };
    }

    const isAboveMaxRange = Math.abs(value.startDate.diff(newValue, 'days')) >= maxRangeInDays;
    if (isAboveMaxRange) {
      return {
        endDate: null,
        isChosenMonth: false,
        startDate: newValue
      };
    }

    const finalStartDate = value.startDate.isAfter(newValue) ? newValue : value.startDate;
    const finalEndDate = value.startDate.isAfter(newValue) ? value.startDate : newValue;

    return {
      endDate: finalEndDate,
      isChosenMonth: false,
      startDate: finalStartDate
    };
  }

  return {
    endDate: null,
    isChosenMonth: false,
    startDate: newValue
  };
};

export const getEventsCalendarNames = (date: string) =>
  moment(date).calendar(null, {
    lastDay: '[Yesterday]',
    lastWeek: '[Last week]',
    nextDay: '[Tomorrow]',
    nextWeek: '[Next week]',
    sameDay: '[Today]',
    sameElse: function () {
      return '[' + moment(date).format('MMMM DD') + ']';
    }
  });

export const getWeekControlInitialValues = (): { [key: string]: IWeekControl } => {
  return moment.weekdays().reduce((accom, w, i) => {
    return {
      ...accom,
      [w]: {
        isOn: i !== 0 && i !== 6,
        time: {
          endTime: moment().set('hour', 20).set('minutes', 30),
          startTime: moment().set('hour', 6).set('minutes', 0)
        }
      }
    };
  }, {});
};

// this function needed for right min/max time handle in time input cmp
export const prepareNewTimeInputValue = (startValue: moment.Moment, newValue: moment.Moment) =>
  moment().set({
    date: startValue.date(),
    hour: newValue.hour(),
    millisecond: newValue.millisecond(),
    minute: newValue.minute(),
    month: startValue.month(),
    second: newValue.second(),
    year: startValue.year()
  });

export const getDayMinutes = (time: moment.Moment | null | undefined) =>
  !time ? null : time.minutes() + time.hours() * 60;
