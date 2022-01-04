import React from 'react';

import clsx from 'clsx';

import { Avatar } from 'common/components/ui/Avatar/Avatar';

import { TCalendarScheduleRow } from '../../../Calendar';

import s from './EmployeesRow.module.scss';

export interface IEmployeesRowProps {
  rows: TCalendarScheduleRow[];
  selectedRow: TCalendarScheduleRow;

  setSelectedRow: React.Dispatch<React.SetStateAction<TCalendarScheduleRow>>;
}

export const EmployeesRow: React.FC<IEmployeesRowProps> = ({ rows, selectedRow, setSelectedRow }) => {
  const handleRowClick = (row: TCalendarScheduleRow) => {
    return () => setSelectedRow(row);
  };

  return (
    <div className={clsx(s.EmployeesRow__container, rows?.length > 0 && s.scroll)}>
      {rows?.map((r) => (
        <div
          className={clsx(s.EmployeesRow__card, selectedRow.id === r.id && s.active)}
          key={r.id}
          onClick={handleRowClick(r)}
        >
          <Avatar containerClassName={s.EmployeesRow__img} avatar={r.employee.img} width={40} height={40} />

          <div className={s.EmployeesRow__content}>
            <div className={s.EmployeesRow__title}>{r.employee.name}</div>

            <div className={s.EmployeesRow__job}>{r.employee.job}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
