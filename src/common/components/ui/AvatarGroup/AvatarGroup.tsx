import React from 'react';

import clsx from 'clsx';

import ImgSrc from 'assets/icons/avatar.png';

import { Avatar } from '../Avatar/Avatar';

import s from './AvatarGroup.module.scss';

export interface IAvatarGroupProps {
  // TODO, make required
  avatars?: string[] | { alt?: string; src: string }[];
  className?: string;
  size?: number;
}

export const AvatarGroup: React.FC<IAvatarGroupProps> = ({ avatars, className, size = 22 }) => {
  // TODO remove
  const temp = avatars || [ImgSrc, ImgSrc, ImgSrc];

  return (
    <div className={clsx(s.AvatarGroup__container, className)}>
      {temp.map((img, index) => (
        <div className={s.AvatarGroup__imgWrapper} key={index}>
          <Avatar
            avatar={typeof img === 'object' ? img.src : img}
            containerClassName={s.AvatarGroup__img}
            emptyText={typeof img === 'object' ? img.alt : ''}
            height={size}
            width={size}
          />
        </div>
      ))}
    </div>
  );
};
