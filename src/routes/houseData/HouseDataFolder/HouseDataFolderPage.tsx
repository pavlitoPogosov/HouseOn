import React, { useState } from 'react';

import { AsideLayoutRight } from 'routes/_layouts/AsideLayoutRight/AsideLayoutRight';

import { HouseDataFolderAside } from './HouseDataFolderAside/HouseDataFolderAside';
import { HouseDataFolderMain } from './HouseDataFolderMain/HouseDataFolderMain';

export interface HouseDataFolderPageProps {}

export const HouseDataFolderPage: React.FC<HouseDataFolderPageProps> = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <AsideLayoutRight
      mainCmp={<HouseDataFolderMain selectedCard={selectedCard} setSelectedCard={setSelectedCard} />}
      asideCmp={<HouseDataFolderAside selectedCard={selectedCard} />}
    />
  );
};
