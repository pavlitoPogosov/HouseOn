import React from 'react';

import clsx from 'clsx';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { HouseStatusType } from 'graphql/types';

import s from './StatusCard.module.scss';

export interface StatusProps {
  totalStatuses?: number;
  containerClassName?: string;
  textClassName?: string;
  shouldAdapt?: boolean;
  status: Pick<HouseStatusType, 'title' | 'text'>;
  statusIndex?: number;

  onAddNew?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  onStatusIndexChange?: (direction: number) => void;
}

export const StatusCard: React.FC<StatusProps> = ({
  totalStatuses,
  containerClassName,
  textClassName,
  shouldAdapt,
  status,
  statusIndex,
  onRemove,
  onAddNew,
  onEdit,
  onStatusIndexChange
}) => {
  const { text, title } = status;

  const handleStatusIndexChange = (direction: number) => {
    return () => {
      onStatusIndexChange && onStatusIndexChange(direction);
    };
  };

  return (
    <div className={clsx(s.StatusCard__container, containerClassName)}>
      <div className={clsx(s.StatusCard__text, textClassName)}>{text}</div>

      <div className={s.StatusCard__controls}>
        <div className={s.StatusCard__actions}>
          {!shouldAdapt && (
            <>
              <div className={s.StatusCard__note}>Note by: {title || 'unknown'}</div>

              {(onEdit || onRemove || onAddNew) && <div className={s.StatusCard__divider} />}
            </>
          )}

          {onEdit && (
            <div onClick={onEdit} className={s.StatusCard__btn}>
              Edit
            </div>
          )}

          {onRemove && (
            <div onClick={onRemove} className={s.StatusCard__btn}>
              Remove
            </div>
          )}

          {onAddNew && (
            <div onClick={onAddNew} className={s.StatusCard__btn}>
              Add new
            </div>
          )}
        </div>

        {totalStatuses && typeof statusIndex !== 'undefined' && (
          <div className={s.StatusCard__iconsWrapper}>
            <span className={s.StatusCard__count}>{`${statusIndex + 1}/${totalStatuses}`}</span>

            {!shouldAdapt && onStatusIndexChange && (
              <>
                <div
                  onClick={handleStatusIndexChange(-1)}
                  className={clsx(s.StatusCard__leftIcon, statusIndex === 0 && s.disabled)}>
                  <ChevronLeftIcon />
                </div>
                <div
                  onClick={handleStatusIndexChange(1)}
                  className={clsx(s.StatusCard__rightIcon, statusIndex === totalStatuses - 1 && s.disabled)}>
                  <ChevronLeftIcon />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
