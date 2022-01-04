import React, { useState } from 'react';

import { PeriodicityTabs } from 'common/components/ui/PeriodicityTabs/PeriodicityTabs';
import { EVERY_MONTH_TAB, EVERY_WEEK_TAB, DIFFERENT_TAB, IPeriodicityTab } from 'variables/periodicityTabs';

import { SectionWrapper } from '../SectionWrapper/SectionWrapper';

import s from './PeriodicitySection.module.scss';

export interface PeriodicitySectionProps {}

export const PeriodicitySection: React.FC<PeriodicitySectionProps> = () => {
  const [selectedTab, setSelectedTab] = useState<IPeriodicityTab>(EVERY_WEEK_TAB);

  return (
    <SectionWrapper title="Periodicity">
      <PeriodicityTabs
        tabs={[EVERY_WEEK_TAB, EVERY_MONTH_TAB, DIFFERENT_TAB]}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
        contentClassName={s.PeriodicitySelector__content}
      />
    </SectionWrapper>
  );
};
