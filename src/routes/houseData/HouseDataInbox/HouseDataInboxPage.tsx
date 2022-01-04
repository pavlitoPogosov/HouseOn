import React from 'react';

import { AsideLayoutRight } from 'routes/_layouts/AsideLayoutRight/AsideLayoutRight';

import { HouseDataInboxAside } from './HouseDataInboxAside/HouseDataInboxAside';
import { HouseDataInboxMain } from './HouseDataInboxMain/HouseDataInboxMain';

export interface HouseDataInboxPageProps {}

export const HouseDataInboxPage: React.FC = () => {
  return <AsideLayoutRight mainCmp={<HouseDataInboxMain />} asideCmp={<HouseDataInboxAside />} />;
};
