import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { ReactComponent as ActiveIcon } from 'assets/icons/play.svg';
import { ReactComponent as ArchivedIcon } from 'assets/icons/task-archived.svg';
import { ReactComponent as InWorkIcon } from 'assets/icons/task-in-work.svg';
import { ReactComponent as ReadyIcon } from 'assets/icons/task-ready.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './Status.module.scss';

export enum StatusState {
  READY = 'ready',
  ACTIVE = 'active',
  IN_WORK = 'in_work',
  ARCHIVED = 'archived'
}

export interface StatusProps {
  status: StatusState;
}

export const TASK_STATUS_TEXT_MAP: { [key in StatusState]: string } = {
  [StatusState.READY]: 'Ready to start',
  [StatusState.ACTIVE]: 'Active',
  [StatusState.IN_WORK]: 'In Work',
  [StatusState.ARCHIVED]: 'Archived'
};

export const TASK_STATUS_ICON_MAP: { [key in StatusState]: JSX.Element } = {
  [StatusState.READY]: <ReadyIcon className={s.Status__icon} />,
  [StatusState.ACTIVE]: <ActiveIcon className={s.Status__icon} />,
  [StatusState.IN_WORK]: <InWorkIcon className={s.Status__icon} />,
  [StatusState.ARCHIVED]: <ArchivedIcon className={s.Status__icon} />
};

export const TASK_STATUS_COLOR_MAP: { [key in StatusState]: string } = {
  [StatusState.READY]: s.Status__color_yellow,
  [StatusState.ACTIVE]: s.Status__color_green,
  [StatusState.IN_WORK]: s.Status__color_blue,
  [StatusState.ARCHIVED]: s.Status__color_gray
};

export const Status: React.FC<StatusProps> = ({ status }) => {
  const intl = useIntl();

  const color = TASK_STATUS_COLOR_MAP[status];
  const text = TASK_STATUS_TEXT_MAP[status];
  const icon = TASK_STATUS_ICON_MAP[status];

  return (
    <div className={clsx(s.Status, color)}>
      {icon} <Text className={s.Status__text} variant={TextPropsVariantsEnum.CAPTION_R} text={text} />
    </div>
  );
};
