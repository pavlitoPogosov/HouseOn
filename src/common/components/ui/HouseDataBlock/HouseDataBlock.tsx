import React from 'react';

import { appHistory } from 'appHistory';
import clsx from 'clsx';

import { HOUSE_DATA_INDEX_PAGE_ROUTE } from 'utils/routes';

import s from './HouseDataBlock.module.scss';

export interface HouseDataBlockProps {
  containerClassName?: string;
}

export const HouseDataBlock: React.FC<HouseDataBlockProps> = ({ containerClassName, children }) => {
  const handleBlockClick = () => {
    appHistory.push(HOUSE_DATA_INDEX_PAGE_ROUTE);
  };

  return (
    <div className={clsx(s.HouseDataBlock__container, containerClassName)} onClick={handleBlockClick}>
      {children}

      <div className={s.HouseDataBlock__circle1} />
      <div className={s.HouseDataBlock__circle2} />
      <div className={s.HouseDataBlock__circle3} />
    </div>
  );
};
