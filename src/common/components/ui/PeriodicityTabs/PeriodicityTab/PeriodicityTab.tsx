import React from 'react';

import clsx from 'clsx';

import s from './PeriodicityTab.module.scss';

type OwnProps = {
  containerClassName?: string;
  isSelected: boolean;
};

export type PeriodicityTabProps = OwnProps & React.HtmlHTMLAttributes<HTMLButtonElement>;

export const PeriodicityTab: React.FC<PeriodicityTabProps> = ({
  children,
  isSelected,
  containerClassName,
  ...otherProps
}) => {
  return (
    <button className={clsx(s.PeriodicityTab__container, isSelected && s.active, containerClassName)} {...otherProps}>
      {children}
    </button>
  );
};
