import React from 'react';

import clsx from 'clsx';

// TODO remove useless picture
import { Avatar } from '../../Avatar/Avatar';
import AvatarImg from '../images/avatar.jpg';

import s from './UserAvatar.module.scss';

export interface IUserAvatarProps {
  className?: string;
  hideInfoBlock?: boolean;
  infoBlockClassName?: string;
  name: string;
  role: string;
}

export const UserAvatar: React.FC<IUserAvatarProps> = (props) => {
  const { className, hideInfoBlock, infoBlockClassName, name, role } = props;

  return (
    <div className={clsx(s.UserAvatar__container, className)}>
      {!hideInfoBlock && (
        <div className={infoBlockClassName}>
          <h6 className={s.UserAvatar__name}>{name}</h6>

          <div className={s.UserAvatar__role}>{role}</div>
        </div>
      )}

      <Avatar
        avatar={AvatarImg}
        containerClassName={clsx(s.UserAvatar__imgWrapper, { [s.UserAvatar__imgWrapper_marginLeft]: !hideInfoBlock })}
        emptyText={name}
        height={hideInfoBlock ? 44 : undefined}
        width={hideInfoBlock ? 44 : undefined}
      />
    </div>
  );
};
