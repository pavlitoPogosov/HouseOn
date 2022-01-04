import React from 'react';

import moment from 'moment';

import { WorkingPeriodCell } from 'common/components/ui/WorkingPeriodCell/WorkingPeriodCell';

import { TCalendarScheduleRow } from '../../../Calendar';

import s from './DaysRows.module.scss';

export const DaysRows: React.FC<TCalendarScheduleRow> = ({ cells, id }) => {
  return (
    <div className={s.DaysRows__container}>
      {cells?.map((c, i) => (
        <div className={s.DaysRows__row} key={i}>
          <div className={s.DaysRows__day}>
            <div>{moment(c.date).format('ddd')}</div>

            <div>{moment(c.date).format('D.MM')}</div>
          </div>

          <WorkingPeriodCell cell={c} containerClassName={s.DaysRows__event} />
        </div>
      ))}
    </div>
  );
};
