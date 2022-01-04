import React, { useCallback, useMemo } from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { DatepickerDay, getCurrentWeekDays, getDaysForMonthSchedule } from 'utils/dates';

import { Accordion, IAccordionRenderTitleOptions } from '../Accordion/Accordion';
import { Text, TextPropsVariantsEnum } from '../Text/Text';

import s from './MonthSchedule.module.scss';

export interface MonthScheduleProps {
  containerClassName?: string;
  currentDate: moment.Moment;
  renderCell: (day: DatepickerDay) => JSX.Element;

  shouldAdapt?: boolean;
}

export const MonthSchedule: React.FC<MonthScheduleProps> = ({
  containerClassName,
  currentDate,
  renderCell,
  shouldAdapt
}) => {
  const weekDays = useMemo(() => getCurrentWeekDays().map((m) => m.format('ddd')), []);
  const monthDays = useMemo(() => getDaysForMonthSchedule(currentDate, !shouldAdapt), [currentDate, shouldAdapt]);

  const renderDesktop = useCallback(
    (weekNames: typeof weekDays, weeks: typeof monthDays) => (
      <>
        {weekNames.map((day, i) => (
          <div className={s.MonthSchedule__weekDay} key={i}>
            {day}
          </div>
        ))}

        {weeks.map((array, i) => (
          <div className={s.MonthSchedule__row} key={i}>
            {array.map((d) => (
              <div className={s.MonthSchedule__date} key={`${d.text}-${i}`}>
                <div className={clsx(s.MonthSchedule__dateNumber, d.isOtherMonth && s.otherMonth)}>{d.text}</div>

                {renderCell(d)}
              </div>
            ))}
          </div>
        ))}
      </>
    ),
    [renderCell]
  );

  const renderMobileAccordionTitle = useCallback(
    ({ handleToggleAccordion, isOpen, title }: IAccordionRenderTitleOptions) => {
      return (
        <div className={s.MonthSchedule__accordionTitleWrapper} onClick={handleToggleAccordion}>
          <Text as="h6" text={title} variant={TextPropsVariantsEnum.CAPTION_M} />

          <ChevronDownIcon className={clsx(s.MonthSchedule__accordionIcon, isOpen && s.rotate)} />
        </div>
      );
    },
    []
  );

  const renderMobileAccordionContent = useCallback(
    (week: DatepickerDay[]) => {
      return (
        <>
          {week.map((weekDay, i) => (
            <div className={s.MonthSchedule__accordionRow} key={i}>
              <div className={s.MonthSchedule__dateCell}>
                <span>{weekDay.fullDate.format('ddd')}</span>

                <span>{weekDay.fullDate.format('DD.MM')}</span>
              </div>

              <div className={s.MonthSchedule__contentCell}>{renderCell(weekDay)}</div>
            </div>
          ))}
        </>
      );
    },
    [renderCell]
  );

  const renderMobile = useCallback(
    (weeks: typeof monthDays) => {
      return (
        <>
          {weeks.map((week, i) => (
            <Accordion
              containerClassName={s.MonthSchedule__accordion}
              disableHover
              key={i}
              renderTitle={renderMobileAccordionTitle}
              title={`${i + 1} week. ${week[0].fullDate.format('DD')} - ${week[week.length - 1].fullDate.format('DD')}`}
              toggleableClassName={s.MonthSchedule__accordionContent}
            >
              {renderMobileAccordionContent(week)}
            </Accordion>
          ))}
        </>
      );
    },
    [renderMobileAccordionTitle, renderMobileAccordionContent]
  );

  return (
    <div className={clsx(s.MonthSchedule__container, shouldAdapt && s.mobile, containerClassName)}>
      {shouldAdapt ? renderMobile(monthDays) : renderDesktop(weekDays, monthDays)}
    </div>
  );
};
