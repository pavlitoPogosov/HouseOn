import React from 'react';

import { Spinner } from 'common/components/ui/Spinner/Spinner';

import s from './CommonSpinner.module.scss';

export interface CommonSpinnerProps {}

export const CommonSpinner: React.FC<CommonSpinnerProps> = () => {
  return <Spinner size="xl" strokeWidth={6} className={s.Spinner} />;
};
