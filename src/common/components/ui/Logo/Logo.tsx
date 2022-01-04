import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { INDEX_PAGE_ROUTE } from 'utils/routes';

import s from './Logo.module.scss';

export interface LogoProps {
  isLink?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ isLink, className }) => {
  const content = <span className={s.Logo__text}>HouseOn</span>;
  const commonClassName = clsx(s.Logo__container, className);

  if (isLink) {
    return (
      <Link className={commonClassName} to={INDEX_PAGE_ROUTE}>
        {content}
      </Link>
    );
  }

  return <div className={commonClassName}>{content}</div>;
};
