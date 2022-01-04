import React from 'react';

import clsx from 'clsx';

import s from './WorkingPeriodCell.module.scss';

export enum WorkingPeriodCellTypes {
  EMPTY = 'Empty',
  DAY_OFF = 'Day-off',
  WORK_DAY = 'Work day',
  VACATION = 'Vacation'
}

export interface IWorkingPeriodCell {
  type: WorkingPeriodCellTypes;
  text?: string;
}

export interface WorkingPeriodCellProps {
  cell: IWorkingPeriodCell;
  containerClassName?: string;
}

export const WorkingPeriodCell: React.FC<WorkingPeriodCellProps> = ({ cell, containerClassName }) => {
  const isWorkDay = cell.type === WorkingPeriodCellTypes.WORK_DAY;
  const isVacation = cell.type === WorkingPeriodCellTypes.VACATION;
  const isDayOff = cell.type === WorkingPeriodCellTypes.DAY_OFF;

  const formatText = (text: string) => {
    const splitText = text.split('-') || text.split(' ');
    return (
      <span>
        {splitText[0]}
        <br />
        {splitText[1]}
      </span>
    );
  };

  const getCellText = () => {
    if (isWorkDay) {
      return formatText(cell.text || 'Work Day');
    }

    if (isVacation) {
      return formatText('Vacation');
    }

    if (isDayOff) {
      return formatText('Day-off');
    }

    return null;
  };

  if (isWorkDay || isVacation || isDayOff) {
    return (
      <div
        className={clsx(
          {
            [s.WorkingPeriodCell__restDay]: isVacation || isDayOff,
            [s.WorkingPeriodCell__work]: isWorkDay
          },
          containerClassName
        )}>
        {getCellText()}
      </div>
    );
  }

  return null;
};
