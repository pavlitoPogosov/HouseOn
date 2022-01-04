import React from 'react';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import {
  Text,
  TextPropsVariantsEnum 
} from 'common/components/ui/Text/Text';

import s from './EventViewPageUser.module.scss';

export interface IEventViewPageUserProps {
  avatar: string | null;
  message: string;
  username: string;
}

export const EventViewPageUser: React.FC<IEventViewPageUserProps> = ({
  avatar,
  message,
  username
}) => {
  return (
    <div className={s.EventViewPageUser__container}>
      {message && <div className={s.EventViewPageUser__message}>{message}</div>}

      <div className={s.EventViewPageUser__avatarWrapper}>
        {
          message && (
            <div className={s.EventViewPageUser__avatarTriangleWrapper}>
              <div className={s.EventViewPageUser__avatarTriangle} />
            </div>
          )
        }

        <Avatar
          avatar={avatar}
          height={64}
          width={64}
        />

        <Text
          className={s.EventViewPageUser__username}
          color="textSecondary"
          text={username}
          variant={TextPropsVariantsEnum.CAPTION_M}
        />
      </div>
    </div>
  );
};
