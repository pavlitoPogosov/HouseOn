import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ToggleSwitch } from 'common/components/ui/ToggleSwitch/ToggleSwitch';

import s from './MainTabNotifications.module.scss';

// TODO remove useless data
const NOTIFICATION_BLOCKS = [
  {
    name: 'Push',
    permissions: [
      {
        type: 'task',
        title: 'tasks',
        allowed: true
      },
      {
        type: 'member',
        title: 'members',
        allowed: true
      },
      {
        type: 'event',
        title: 'events',
        allowed: true
      },
      {
        type: 'comment',
        title: 'comments',
        allowed: true
      }
    ]
  },
  {
    name: 'Email',
    permissions: [
      {
        type: 'task',
        title: 'tasks',
        allowed: true
      },
      {
        type: 'member',
        title: 'members',
        allowed: true
      },
      {
        type: 'event',
        title: 'events',
        allowed: true
      },
      {
        type: 'comment',
        title: 'comments',
        allowed: true
      }
    ]
  }
];

export interface MainTabNotificationsProps {
  isLoading?: boolean;
  onSubmit: () => void;
}

export const MainTabNotifications: React.FC<MainTabNotificationsProps> = ({ onSubmit, isLoading }) => {
  const intl = useIntl();

  return (
    <div className={s.MainTabNotifications__container}>
      <Text
        text={intl.formatMessage({
          id: 'settings.notifications.title',
          defaultMessage: 'Notifications'
        })}
        variant={TextPropsVariantsEnum.H3}
        className={s.MainTabNotifications__title}
      />

      {NOTIFICATION_BLOCKS.map((b, i) => (
        <div className={s.MainTabNotifications__block} key={b.name + i}>
          <Text text={b.name} className={s.MainTabNotifications__blockTitle} variant={TextPropsVariantsEnum.BODY_M} />

          <div className={s.MainTabNotifications__inner}>
            {b.permissions.map((p, i) => (
              <div key={i} className={s.MainTabNotifications__blockPermission}>
                <Text
                  text={p.title}
                  variant={TextPropsVariantsEnum.BODY_M}
                  className={s.MainTabNotifications__blockPermissionTitle}
                />

                <ToggleSwitch size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={s.MainTabNotifications__controls}>
        <Button
          color="orange"
          variant="secondary"
          size="m"
          className={s.MainTabNotifications__controlBtn}
          disabled={isLoading}>
          <FormattedMessage id="app.button.cancel" defaultMessage="Cancel" />
        </Button>

        {/* TODO add debounce on button, when this part will be included into app */}
        <Button
          color="orange"
          variant="primary"
          size="m"
          className={s.MainTabNotifications__controlBtn}
          onClick={onSubmit}
          isLoading={isLoading}>
          <FormattedMessage id="app.button.save" defaultMessage="Save" />
        </Button>
      </div>
    </div>
  );
};
