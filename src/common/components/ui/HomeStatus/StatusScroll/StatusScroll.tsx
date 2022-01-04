import React from 'react';

import clsx from 'clsx';

import { HouseStatusType } from 'graphql/types';

import { StatusCard } from '../StatusCard/StatusCard';

import s from './StatusScroll.module.scss';

export interface StatusScrollProps {
  statuses: Pick<HouseStatusType, 'text' | 'title'>[];

  onAddNew: () => void;
  onEdit: () => void;
  onRemove: () => void;
  setShownStatusIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const StatusScroll: React.FC<StatusScrollProps> = ({
  statuses,
  onAddNew,
  onEdit,
  onRemove,
  setShownStatusIndex
}) => {
  const handleStatusEdit = (index: number) => {
    return () => {
      setShownStatusIndex(index);
      onEdit && onEdit();
    };
  };

  return (
    <div className={clsx(s.StatusScroll__container, { [s.overflow]: statuses.length > 1 })}>
      {statuses.map((status, i) => (
        <StatusCard
          key={status.text + i}
          status={status}
          onAddNew={onAddNew}
          onEdit={handleStatusEdit(i)}
          onRemove={onRemove}
          containerClassName={clsx(s.StatusScroll__status, { [s.fullWidth]: statuses.length === 1 })}
          statusIndex={i}
          totalStatuses={statuses.length}
          shouldAdapt
        />
      ))}
    </div>
  );
};
