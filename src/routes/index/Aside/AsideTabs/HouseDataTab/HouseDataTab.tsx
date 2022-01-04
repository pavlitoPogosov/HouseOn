import React from 'react';

import { ReactComponent as BookIcon } from 'assets/icons/book.svg';
import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { HouseDataBlock } from 'common/components/ui/HouseDataBlock/HouseDataBlock';

import s from './HouseDataTab.module.scss';

export interface HouseDataTabProps {}

export const HouseDataTab: React.FC<HouseDataTabProps> = () => {
  return (
    <HouseDataBlock containerClassName={s.HouseDataTab__container}>
      <div className={s.HouseDataTab__bookIcon}>
        <BookIcon />
      </div>

      <div className={s.HouseDataTab__counter}>1</div>

      <div className={s.HouseDataTab__content}>
        <div className={s.HouseDataTab__title}>HouseData</div>

        <div className={s.HouseDataTab__chevronIcon}>
          <ChevronRightIcon height={8} />
        </div>
      </div>
    </HouseDataBlock>
  );
};
