import React from 'react';

import { InformationBanner } from '../_common/banners/InformationBanner/InformationBanner';
import { ProjectsBanner } from '../_common/banners/ProjectsBanner/ProjectsBanner';
import { LastActivities } from '../Main/LastActivities/LastActivities';

import { AsideSections } from './AsideSections/AsideSections';
import { AsideTabs } from './AsideTabs/AsideTabs';

import s from './Aside.module.scss';

export interface AsideProps {
  shouldAdapt?: boolean;
}

export const Aside: React.FC<AsideProps> = ({ shouldAdapt }) => (
  <div className={s.Aside__container}>
    <AsideTabs />
    {shouldAdapt && (
      <>
        <InformationBanner />
        <ProjectsBanner />
      </>
    )}
    <AsideSections />
    {shouldAdapt && <LastActivities />}
  </div>
);
