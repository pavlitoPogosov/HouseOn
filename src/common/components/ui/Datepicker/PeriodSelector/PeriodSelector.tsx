import React, { useMemo } from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';

import { EDatepickerCalendarTypes } from '../Datepicker';

import s from './PeriodSelector.module.scss';

export interface PeriodSelectorProps {
  activeType: EDatepickerCalendarTypes;
  disabledCalendars?: EDatepickerCalendarTypes[];
  setActiveType: React.Dispatch<React.SetStateAction<EDatepickerCalendarTypes>>;

  setShownDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  shownDate: moment.Moment;
}

// TODO add slide animation on change period, also add such animation in calendar
export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  activeType,
  disabledCalendars,
  setActiveType,
  setShownDate,
  shownDate
}) => {
  const TABS = useMemo(
    () =>
      [
        { text: 'Month', value: EDatepickerCalendarTypes.MONTH },
        { text: 'Year', value: EDatepickerCalendarTypes.YEAR }
      ].filter((t) => !disabledCalendars?.includes(t.value)),
    [disabledCalendars]
  );

  const isMonth = activeType === EDatepickerCalendarTypes.MONTH;
  const isYear = activeType === EDatepickerCalendarTypes.YEAR;

  const handleTabClick = (activeTab: EDatepickerCalendarTypes) => {
    return () => {
      setActiveType(activeTab);
    };
  };

  const handlePeriodChange = (direction: number) => {
    return () => {
      setShownDate((prev) => {
        if (isYear) {
          return moment(prev.clone().set('year', prev.year() + direction));
        }

        return moment(prev.clone().set('month', prev.month() + direction));
      });
    };
  };

  const getSliderText = () => {
    return isYear ? shownDate.year() : shownDate.format('MMMM YYYY');
  };

  return (
    <div className={s.PeriodSelector__container}>
      <div className={s.PeriodSelector__tabs}>
        {TABS.map((t) => (
          <div
            className={clsx(s.PeriodSelector__tab, t.value === activeType && s.active)}
            key={t.value}
            onClick={handleTabClick(t.value)}
          >
            {t.text}
          </div>
        ))}
      </div>

      <div className={s.PeriodSelector__slider}>
        <div className={s.PeriodSelector__leftIcon} onClick={handlePeriodChange(-1)}>
          <ChevronLeftIcon />
        </div>

        <div
          className={clsx(s.PeriodSelector__sliderTextWrapper, {
            [s.month]: isMonth,
            [s.year]: isYear
          })}
        >
          <div className={s.PeriodSelector__sliderText}>{getSliderText()}</div>
        </div>

        <div className={s.PeriodSelector__rightIcon} onClick={handlePeriodChange(1)}>
          <ChevronLeftIcon />
        </div>
      </div>
    </div>
  );
};
