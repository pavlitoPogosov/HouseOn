import React from 'react';

import clsx from 'clsx';

import s from './ToggleSwitch.module.scss';

type OwnProps = {
  containerClassName?: string;
  size?: 'sm' | 'md';
  onLabelClick?: (e: React.MouseEvent) => void;
};

export type ToggleSwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & OwnProps;

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  containerClassName,
  size = 'md',
  onLabelClick,
  ...otherProps
}) => {
  return (
    <label
      onClick={onLabelClick}
      className={clsx(
        s.ToggleSwitch__container,
        s[size],
        containerClassName,
        otherProps.disabled ? s.ToggleSwitch__container_disabled : ''
      )}>
      <input {...otherProps} type="checkbox" className={s.ToggleSwitch__input} />

      <div className={s.ToggleSwitch__slide}>
        <span className={clsx(s.ToggleSwitch__circle, s[size])} />
      </div>
    </label>
  );
};
