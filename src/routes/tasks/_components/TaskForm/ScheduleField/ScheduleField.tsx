import React, { useState } from 'react';

import { PeriodicityTabs } from 'common/components/ui/PeriodicityTabs/PeriodicityTabs';
import { DIFFERENT_TAB, EVERY_MONTH_TAB, EVERY_WEEK_TAB, ONCE_TAB, IPeriodicityTab } from 'variables/periodicityTabs';

export interface ScheduleFieldProps {}

export const ScheduleField: React.FC<ScheduleFieldProps> = () => {
  const [selectedTab, setSelectedTab] = useState<IPeriodicityTab>(EVERY_WEEK_TAB);

  return (
    <PeriodicityTabs
      tabs={[ONCE_TAB, EVERY_WEEK_TAB, EVERY_MONTH_TAB, DIFFERENT_TAB]}
      selectedTab={selectedTab}
      onSelect={setSelectedTab}
    />
  );
};
