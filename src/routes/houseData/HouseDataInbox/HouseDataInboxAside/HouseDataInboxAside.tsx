import React from 'react';

import s from './HouseDataInboxAside.module.scss';

export interface HouseDataInboxAsideProps {}

export const HouseDataInboxAside: React.FC<HouseDataInboxAsideProps> = () => {
  return (
    <>
      <div className={s.HouseDataInboxAside__image} />
    </>
  );
};
