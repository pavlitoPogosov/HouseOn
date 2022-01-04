import React from 'react';

import { MainTabDangerZone } from './MainTabDangerZone/MainTabDangerZone';
import { MainTabForm } from './MainTabForm/MainTabForm';
// import { MainTabNotifications } from './MainTabNotifications/MainTabNotifications';
import { MainTabMembers } from './MainTabMembers/MainTabMembers';

import s from './MainTab.module.scss';

export interface MainTabProps {}

export const MainTab: React.FC<MainTabProps> = () => {
  return (
    <div className={s.MainTab__container}>
      <MainTabForm />
      <MainTabMembers />

      {/* <MainTabNotifications onSubmit={handleSubmit} isLoading={isLoading} /> */}

      <MainTabDangerZone />
    </div>
  );
};
