import React from 'react';

import s from './HeaderDefault.module.scss';

export interface HeaderDefaultProps {
  children: JSX.Element;
}

export const HeaderDefault: React.FC<HeaderDefaultProps> = ({ children }) => {
  return <div className={s.HeaderDefault}>{children}</div>;
};
