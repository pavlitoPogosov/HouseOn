import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { TCalendarDayCell } from 'utils/calendar';

import s from './EventsDays.module.scss';

export interface EventsDaysProps {
  dayCells: TCalendarDayCell[];
  isEmpty: boolean;
  lineHeight: number;
}

export const EventsDays: React.FC<EventsDaysProps> = ({ dayCells, isEmpty, lineHeight }) => {
  const today = moment().startOf('day');

  return (
    <>
      {dayCells.map((c, i) => (
        <div className={s.EventsDays__cell} key={i}>
          <div
            className={clsx(s.EventsDats__cellInner, today.isSame(c.fullDate.startOf('day')) && !isEmpty && s.active)}>
            <span>{c.fullDate.format('ddd')}</span>

            <span>&#8226;</span>

            <span>{c.fullDate.format('DD.MM')}</span>

            {today.isSame(c.fullDate.startOf('day')) && !isEmpty && (
              <div className={s.EventsDays__activeLine} style={{ height: lineHeight - 26 }} />
            )}
          </div>

          <div className={s.EventsDays__cellLine} style={{ height: lineHeight }} />

          {i + 1 === dayCells.length && (
            <div className={clsx(s.EventsDays__cellLine, s.right)} style={{ height: lineHeight }} />
          )}
        </div>
      ))}
    </>
  );
};
