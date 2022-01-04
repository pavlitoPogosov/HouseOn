import React from 'react';

import clsx from 'clsx';
import lodash from 'lodash';
import moment from 'moment';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { getEventsCalendarNames } from 'utils/dates';

import { INotification, UserNotification } from './UserNotification/UserNotification';
import { UserNotificationTabs } from './UserNotificationTabs/UserNotificationTabs';

import s from './UserNotifications.module.scss';

export interface NotificationsProps {
  containerClassName?: string;
  notifications: INotification[];
}

export const UserNotifications: React.FC<NotificationsProps> = ({ notifications, containerClassName }) => {
  const uniqueDates = lodash.uniqWith(
    notifications.map((item) => getEventsCalendarNames(moment(item.date).toISOString())),
    lodash.isEqual
  );

  return (
    <>
      <div className={clsx(s.UserNotifications__wrapper, containerClassName)}>
        <div className={s.UserNotifications__container}>
          <div>
            <div className={s.UserNotifications__headerText}>
              <Text text="Notifications" variant={TextPropsVariantsEnum.H3} className={s.UserNotifications__title} />
              <Text variant={TextPropsVariantsEnum.BODY_M} className={s.UserNotifications__allIsRead}>
                Make all as read
              </Text>
            </div>
          </div>

          <UserNotificationTabs />

          <div className={s.Notifications_list}>
            {uniqueDates.map((date, index) => {
              const neededNotifications = notifications.map(
                (notification, i) =>
                  getEventsCalendarNames(moment(notification.date).toISOString()) === date && (
                    <UserNotification
                      key={`card-${i}`}
                      notification={notification}
                      className={s.UserNotifications__notification}
                    />
                  )
              );

              return (
                <div key={index} className={s.Notifications_item}>
                  <Text variant={TextPropsVariantsEnum.BODY_M} className={s.UserNotifications_date}>
                    {date}
                  </Text>
                  <div className={s.UserNotifications__notificatinos}>{neededNotifications}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
