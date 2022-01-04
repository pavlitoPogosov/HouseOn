import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { ReactComponent as TaskIcon } from 'assets/icons/task.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { ColorfulIcon, ColorfulIconTypes, ColorfulIconVariants } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { UserNotificationTitle } from './UserNotificationTitle/UserNotificationTitle';

import s from './UserNotification.module.scss';

export enum NotificationTypesEnum {
  MESSAGE = 'message',
  OVERSUE_TASK = 'overdue-task',
  TASK = 'task',
  COMMENT = 'comment',
  APP = 'app'
}

export interface INotification {
  id: string;
  date: string;
  avatar: string;
  type: NotificationTypesEnum;
  messagesCount?: number;
  tasksCount?: number;
  commentsCount?: number;
  source?: string;
  message?: {
    chat: string;
    text: string;
  };
  task?: {
    to: string;
    project: string;
  };
  comment?: {
    avatar: string;
    text: string;
  };
  overdueTask?: {
    name: string;
    deadline: number;
  };
}

export interface NotificationProps {
  notification: INotification;
  className?: string;
}

export const UserNotification: React.FC<NotificationProps> = ({ notification, className }) => {
  const renderContent = () => {
    if (notification.type === NotificationTypesEnum.MESSAGE) {
      return (
        <Text variant={TextPropsVariantsEnum.BODY_M} className={s.UserNotification__message}>
          {notification.message?.text}
        </Text>
      );
    }

    if (notification.type === NotificationTypesEnum.COMMENT) {
      return (
        <div className={s.UserNotification__comment}>
          <Avatar
            avatar={notification.comment?.avatar}
            containerClassName={clsx(s.UserNotification__avatar_sm, s.UserNotification__comment_avatar)}
          />
          <Text variant={TextPropsVariantsEnum.BODY_M} className={s.UserNotification__message}>
            {notification.comment?.text}
          </Text>
        </div>
      );
    }

    return null;
  };

  const renderIcon = () => {
    if (notification.type === NotificationTypesEnum.MESSAGE) {
      return (
        <ColorfulIcon
          icon={ColorfulIconTypes.LETTER}
          variant={ColorfulIconVariants.GREEN}
          className={s.UserNotificationIcon__colorfulIcon}
        />
      );
    }

    if (notification.type === NotificationTypesEnum.OVERSUE_TASK) {
      return (
        <ColorfulIcon
          icon={ColorfulIconTypes.EXCLAMATION_POINT}
          variant={ColorfulIconVariants.RED}
          className={s.UserNotificationIcon__colorfulIcon}
        />
      );
    }

    if (notification.type === NotificationTypesEnum.COMMENT) {
      return (
        <ColorfulIcon
          icon={ColorfulIconTypes.COMMENT}
          variant={ColorfulIconVariants.BLUE}
          className={s.UserNotificationIcon__colorfulIcon}
        />
      );
    }

    return null;
  };

  return (
    <div className={clsx(className)}>
      <div className={s.UserNotification__header}>
        <div className={s.UserNotification__header_col}>
          <div className={s.UserNotification__avatarWrapper}>
            <div className={s.UserNotification__isOnline} />
            {notification.type === NotificationTypesEnum.TASK ? (
              <div
                className={clsx(
                  s.UserNotification__avatar,
                  s.UserNotification__avatar_task,
                  s.UserNotification__avatar_md
                )}>
                <TaskIcon />
              </div>
            ) : notification.type === NotificationTypesEnum.APP ? (
              <Text
                variant={TextPropsVariantsEnum.H3}
                className={clsx(
                  s.UserNotification__avatar,
                  s.UserNotification__avatar_app,
                  s.UserNotification__avatar_md
                )}>
                HO
              </Text>
            ) : (
              <Avatar avatar={notification.avatar} width={44} height={44} />
            )}
            {renderIcon()}
          </div>
          <UserNotificationTitle {...notification} />
        </div>
        <Text variant={TextPropsVariantsEnum.BODY_M} className={s.UserNotification__header_date}>
          {moment(notification.date).fromNow()}
        </Text>
      </div>
      <div className={s.UserNotification__content}>{renderContent()}</div>
    </div>
  );
};
