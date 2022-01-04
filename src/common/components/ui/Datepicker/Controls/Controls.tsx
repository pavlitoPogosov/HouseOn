import React from 'react';

import clsx from 'clsx';

import { Checkbox } from '../../Checkbox/Checkbox';
import { EDatepickerCalendarTypes } from '../Datepicker';

import s from './Controls.module.scss';

export interface ControlsProps {
  activeType: EDatepickerCalendarTypes;
  canSelectOnlyRange?: boolean;
  isMultiple: boolean;

  onChangeMultiple: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Controls: React.FC<ControlsProps> = ({ activeType, canSelectOnlyRange, isMultiple, onChangeMultiple }) => {
  const isMonth = activeType === EDatepickerCalendarTypes.MONTH;
  const isYear = activeType === EDatepickerCalendarTypes.YEAR;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeMultiple(e.target.checked);
  };

  const renderHelpControl = () => {
    if (canSelectOnlyRange) {
      return (
        <div className={s.Controls__container}>
          <div className={s.Controls__helpText}>Select multiple days up to week</div>
        </div>
      );
    }

    if (isYear) {
      return (
        <div className={s.Controls__container}>
          <div className={s.Controls__helpText}>You can choose one month</div>
        </div>
      );
    }

    return (
      <Checkbox
        checked={isMultiple}
        containerClassName={s.Controls_checkboxContainer}
        onChange={handleCheckboxChange}
        text="Select multiple days up to week"
      />
    );
  };

  return (
    <div
      className={clsx(s.Controls__container, {
        [s.year]: isYear,
        [s.month]: isMonth
      })}
    >
      {renderHelpControl()}
    </div>
  );
};
