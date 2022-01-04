import React from 'react';

import moment from 'moment';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { INotification, NotificationTypesEnum } from '../UserNotification';

import s from './UserNotificationTitle.module.scss';

export const UserNotificationTitle: React.FC<INotification> = ({
  type,
  messagesCount,
  tasksCount,
  overdueTask,
  commentsCount,
  task,
  source,
  message,
  comment,
  date
}) => {
  const baseTitleProps = { variant: TextPropsVariantsEnum.BODY_M, className: s.UserNotificationTitle };

  const NOTIFICATION_TITLE_MAP = {
    [NotificationTypesEnum.MESSAGE]: (
      <Text {...baseTitleProps}>
        {messagesCount} new message in the chat {message?.chat} from{' '}
        <span className={s.UserNotificationTitle_green}>{source}</span>
      </Text>
    ),
    [NotificationTypesEnum.TASK]: (
      <Text {...baseTitleProps}>
        {tasksCount} new task to <span className={s.UserNotificationTitle_green}>{task?.to}</span> in the{' '}
        <span className={s.UserNotificationTitle_green}>{task?.project}</span>
      </Text>
    ),
    [NotificationTypesEnum.OVERSUE_TASK]: (
      <Text {...baseTitleProps}>
        A task <span className={s.UserNotificationTitle_green}>{overdueTask?.name}</span>{' '}
        <span className={s.UserNotificationTitle_red}>{moment(date).from(overdueTask?.deadline)}</span>
      </Text>
    ),
    [NotificationTypesEnum.COMMENT]: (
      <Text {...baseTitleProps}>
        {commentsCount} new comment in the task <span className={s.UserNotificationTitle_green}>{comment?.text}</span>
      </Text>
    ),
    [NotificationTypesEnum.APP]: (
      <Text {...baseTitleProps}>
        <span className={s.UserNotificationTitle_green}>{source}</span> updated to version 5.18
      </Text>
    )
  };

  return <>{NOTIFICATION_TITLE_MAP[type]}</>;
};
