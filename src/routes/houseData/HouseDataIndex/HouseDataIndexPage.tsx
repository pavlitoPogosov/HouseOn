import React from 'react';

import { UsualLayout } from 'routes/_layouts/UsualLayout/UsualLayout';
// import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { HouseDataContent } from './HouseDataContent/HouseDataContent';
import { HouseDataIntro } from './HouseDataIntro/HouseDataIntro';

import s from './HouseDataIndexPage.module.scss';

export interface HouseDataIndexPageProps {}

export const HouseDataIndexPage: React.FC<HouseDataIndexPageProps> = () => (
  <UsualLayout headerClassName={s.HouseDataIndexPage__header} hideSearchBlock>
    <div className={s.HouseDataIndexPage__inner}>
      <HouseDataIntro />
      <HouseDataContent />

      {/* TODO ask about this cmp */}
      {/* <Text variant={TextPropsVariantsEnum.BODY_M} className={s.HouseDataIndexPage__daysLeft}>
        Big house <span className={s.HouseDataIndexPage__days}>12</span> days left
      </Text> */}
    </div>
  </UsualLayout>
);
