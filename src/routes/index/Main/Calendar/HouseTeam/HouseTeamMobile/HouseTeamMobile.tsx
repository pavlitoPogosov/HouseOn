import React, { useState } from 'react';

import { TCalendarScheduleRow } from '../../Calendar';

import { DaysRows } from './DaysRows/DaysRows';
import { EmployeesRow } from './EmployeesRow/EmployeesRow';

import s from './HouseTeamMobile.module.scss';

export interface IHouseTeamMobileProps {
  datepickerCmp: React.ReactNode;
  rows: TCalendarScheduleRow[];
}

export const HouseTeamMobile: React.FC<IHouseTeamMobileProps> = ({ datepickerCmp, rows }) => {
  const [selectedRow, setSelectedRow] = useState(rows?.[0]);

  return (
    <div className={s.SheduleMobile__container}>
      <EmployeesRow rows={rows} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />

      {datepickerCmp}

      <DaysRows {...selectedRow} />
    </div>
  );
};
