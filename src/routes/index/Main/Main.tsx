import React from 'react';

import { InformationBanner } from '../_common/banners/InformationBanner/InformationBanner';
import { ProjectsBanner } from '../_common/banners/ProjectsBanner/ProjectsBanner';
import { LastActivities } from '../Main/LastActivities/LastActivities';

import { Calendar } from './Calendar/Calendar';
import { HomeCard } from './HomeCard/HomeCard';

import s from './Main.module.scss';

export interface MainProps {
  shouldAdapt: boolean;
}

export const Main: React.FC<MainProps> = ({ shouldAdapt }) => (
  <div className={s.Main__container}>
    <HomeCard />
    {shouldAdapt && (
      <>
        <InformationBanner />
        <ProjectsBanner />
      </>
    )}
    <Calendar />
    {shouldAdapt && <LastActivities />}
  </div>
);
