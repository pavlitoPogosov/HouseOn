import React from 'react';

import clsx from 'clsx';

import s from './NotificationBadge.module.scss';

export interface NotificationBadgeProps {
  text?: string;
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ text, children, className }) => {
  return <div className={clsx(s.NotificationBadge__container, className)}>{children ?? text}</div>;
};
