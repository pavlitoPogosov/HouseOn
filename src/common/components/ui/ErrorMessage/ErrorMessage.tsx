import React from 'react';

import clsx from 'clsx';

import s from './ErrorMessage.module.scss';

export interface ErrorMessageProps {
  className?: string;
  error: string | undefined | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className }) => {
  if (!error) return null;

  return <div className={clsx(s.ErrorMessage__container, className)}>{error}</div>;
};
