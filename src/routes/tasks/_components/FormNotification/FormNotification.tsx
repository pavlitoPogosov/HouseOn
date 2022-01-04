import React, { useState } from 'react';

import clsx from 'clsx';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

import s from './FormNotification.module.scss';

export interface FormNotificationProps {
  children: JSX.Element;
}

export const FormNotification: React.FC<FormNotificationProps> = ({ children }) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <div className={clsx(s.FormNotification, { [s.FormNotification__show]: isShow })}>
      {children}
      <CloseIcon className={s.FormNotification__icon} onClick={() => setIsShow(false)} />
    </div>
  );
};
