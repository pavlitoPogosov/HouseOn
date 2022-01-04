import React from 'react';

import clsx from 'clsx';

import { ReactComponent as ExclamationPointIcon } from 'assets/icons/exclamationPoint.svg';
import { ReactComponent as ReadyToStartIcon } from 'assets/icons/turn-on-off.svg';

import { ReactComponent as ArchivedIcon } from './icons/archived.svg';
import { ReactComponent as DoneIcon } from './icons/done.svg';
import { ReactComponent as PauseIcon } from './icons/pause.svg';
import { ReactComponent as PlayIcon } from './icons/play.svg';

import s from './StatusBadge.module.scss';

export enum EStatusBadgeTypesEnum {
  IS_ACTIVE = 'is_active',
  IS_ARCHIVED = 'is_archived',
  IS_DONE = 'is_done',
  IS_OVERDUE = 'is_overdue',
  IS_PAUSED = 'is_paused',
  IS_READY_TO_START = 'is_ready_to_start'
}

const STATUS_BADGE_MAP = {
  [EStatusBadgeTypesEnum.IS_PAUSED]: (
    <>
      <PauseIcon /> Paused
    </>
  ),
  [EStatusBadgeTypesEnum.IS_READY_TO_START]: (
    <>
      <ReadyToStartIcon /> Ready to start
    </>
  ),
  [EStatusBadgeTypesEnum.IS_ACTIVE]: (
    <>
      <PlayIcon /> Active
    </>
  ),
  [EStatusBadgeTypesEnum.IS_DONE]: (
    <>
      <DoneIcon /> Done
    </>
  ),
  [EStatusBadgeTypesEnum.IS_OVERDUE]: (
    <>
      <ExclamationPointIcon /> Overdue
    </>
  ),
  [EStatusBadgeTypesEnum.IS_ARCHIVED]: (
    <>
      <ArchivedIcon /> Archived
    </>
  )
};
export interface IStatusBadgeProps {
  containerClassName?: string;
  statusType?: EStatusBadgeTypesEnum;
}

export const StatusBadge: React.FC<IStatusBadgeProps> = (props) => {
  const { children, containerClassName, statusType } = props;

  return (
    <div
      className={clsx(
        s.StatusBadge__container,
        {
          [s.done]: statusType === EStatusBadgeTypesEnum.IS_DONE,
          [s.ready]: statusType === EStatusBadgeTypesEnum.IS_READY_TO_START,
          [s.active]: statusType === EStatusBadgeTypesEnum.IS_ACTIVE,
          [s.overdue]: statusType === EStatusBadgeTypesEnum.IS_OVERDUE,
          [s.archived]: statusType === EStatusBadgeTypesEnum.IS_ARCHIVED
        },
        containerClassName
      )}>
      {children ?? STATUS_BADGE_MAP[statusType!]}
    </div>
  );
};
