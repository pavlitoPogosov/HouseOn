import React from 'react';

import s from './CenteredContainer.module.scss';

export interface CenteredContainerProps {}

export const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => {
  return <div className={s.CenteredContainer}>{children}</div>;
};
