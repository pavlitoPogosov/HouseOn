import React from 'react';

import clsx from 'clsx';

import s from './BarProgress.module.scss';

export interface BarProgressProps {
  containerClassName?: string;
  progressClassName?: string;
  backgroundClassName?: string;

  percent: number;
}

export const BarProgress: React.FC<BarProgressProps> = ({
  progressClassName,
  backgroundClassName,
  containerClassName,
  percent
}) => {
  return (
    <div className={clsx(s.BarProgress__container, containerClassName)}>
      <div className={clsx(s.BarProgress__background, backgroundClassName)}>
        <div
          className={clsx(s.BarProgress__progress, backgroundClassName)}
          style={{ width: `${Math.abs(percent)}%` }}
        />
      </div>
    </div>
  );
};
