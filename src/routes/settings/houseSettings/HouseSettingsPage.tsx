import React from 'react';

import { AsideLayoutRight } from 'routes/_layouts/AsideLayoutRight/AsideLayoutRight';

import { HouseSettingsAside } from './HouseSettingsAside/HouseSettingsAside';
import { HouseSettingsMain } from './HouseSettingsMain/HouseSettingsMain';

import s from './HouseSettingsPage.module.scss';

export interface HouseSettingsPageProps {}

export const HouseSettingsPage: React.FC<HouseSettingsPageProps> = () => {
  return (
    <AsideLayoutRight
      mainCmp={<HouseSettingsMain />}
      asideCmp={<HouseSettingsAside />}
      asideClassName={s.HouseSettingsPage__aside}
    />
  );
};
