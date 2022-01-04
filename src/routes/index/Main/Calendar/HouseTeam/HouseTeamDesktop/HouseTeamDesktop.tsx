import React from 'react';

import moment from 'moment';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { WorkingPeriodCell } from 'common/components/ui/WorkingPeriodCell/WorkingPeriodCell';

import { TCalendarScheduleRow } from '../../Calendar';

import s from './HouseTeamDesktop.module.scss';

export interface IHouseTeamDesktopProps {
  rows: TCalendarScheduleRow[];
}

export const HouseTeamDesktop: React.FC<IHouseTeamDesktopProps> = ({ rows }) => {
  return rows?.length ? (
    <div className={s.HouseTeamDesktop__container}>
      <div className={s.HouseTeamDesktop__header}>
        <div className={s.HouseTeamDesktop__headerCell}>Employee</div>

        {rows[0].cells.map((c, i) => (
          <div className={s.HouseTeamDesktop__headerCell} key={i}>
            {moment(c.date).format('ddd')}

            <span className={s.HouseTeamDesktop__headerDot}>&#8226;</span>

            <span className={s.HouseTeamDesktop__date}>{moment(c.date).format('D.MM')}</span>
          </div>
        ))}
      </div>

      <div className={s.HouseTeamDesktop__body}>
        {rows?.map((r) => (
          <div className={s.HouseTeamDesktop__rowContainer} key={r.id}>
            <div className={s.HouseTeamDesktop__rowCell}>
              <Avatar
                containerClassName={s.HouseTeamDesktop__rowEmployeeImg}
                avatar={r.employee.img}
                width={40}
                height={40}
              />

              <div className={s.HouseTeamDesktop__rowEmployeeContent}>
                <div className={s.HouseTeamDesktop__rowEmployeeTitle}>{r.employee.name}</div>

                <div className={s.HouseTeamDesktop__rowEmployeeJob}>{r.employee.job}</div>
              </div>
            </div>

            {r.cells.map((c, i) => (
              <div className={s.HouseTeamDesktop__rowCell} key={i}>
                <WorkingPeriodCell cell={c} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
