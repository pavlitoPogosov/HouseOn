import React from 'react';

import clsx from 'clsx';

import { EColors } from 'variables/colors';

import s from './OnlineStatusLabel.module.scss';

type TOnlineStatusLabel = {
  containerClassName?: string;
  dotClassName?: string;
  dotColor?: EColors;
  dotSize?: number;
  isOnline?: boolean;
};

export const OnlineStatusLabel = (props: TOnlineStatusLabel): JSX.Element => {
  const { dotColor = EColors.BLUE200, dotSize = 9, containerClassName, isOnline, dotClassName } = props;

  let color = dotColor;

  if (typeof isOnline === 'boolean') {
    if (isOnline) {
      color = EColors.GREEN200;
    } else {
      color = EColors.RED200;
    }
  }
  return (
    <div className={clsx(s.OnlineStatusLabel__container, containerClassName)}>
      <span
        className={clsx(s.OnlineStatusLabel__dot, dotClassName)}
        style={{
          backgroundColor: color,
          height: `${dotSize}px`,
          width: `${dotSize}px`
        }}
      />
    </div>
  );
};
