import React from 'react';

import clsx from 'clsx';

import s from './Avatar.module.scss';

export interface IAvatarProps {
  avatar?: string | null;
  containerClassName?: string;
  emptyClassName?: string;
  emptyText?: string;
  height?: number;
  imgClassName?: string;
  width?: number;
}

export const Avatar = React.forwardRef<HTMLDivElement, IAvatarProps>((props, ref) => {
  const { avatar, containerClassName, emptyClassName, emptyText, height = 32, imgClassName, width = 32 } = props;

  return (
    <div className={clsx(s.Avatar__wrapper, containerClassName)} ref={ref} style={{ height, width }}>
      {!avatar ? (
        <div className={clsx(s.Avatar__empty, emptyClassName)}>{emptyText?.charAt(0)}</div>
      ) : (
        <img alt="" className={clsx(s.Avatar__image, imgClassName)} src={avatar} />
      )}
    </div>
  );
});
