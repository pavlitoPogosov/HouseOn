import React from 'react';

import clsx from 'clsx';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

import s from './Alert.module.scss';

export type TAlertColors = 'green' | 'gray' | 'white';

export interface IAlertProps {
  color?: TAlertColors;

  containerClassName?: string;
  onClose?: () => void;

  text: string;
}

export const Alert: React.FC<IAlertProps> = ({ children, color = 'green', containerClassName, onClose, text }) => {
  return (
    <div
      className={clsx(
        s.Alert__container,
        {
          [s.Alert__green]: color === 'green',
          [s.Alert__gray]: color === 'gray',
          [s.Alert__white]: color === 'white'
        },
        containerClassName
      )}>
      {onClose && (
        <div className={s.Alert__closeIcon} onClick={onClose}>
          <CloseIcon height={14} width={14} />
        </div>
      )}

      <div className={clsx(s.Alert__text, children && s.withChildren)}>{text}</div>

      {children}
    </div>
  );
};
