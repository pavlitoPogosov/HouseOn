import React from 'react';

import { EventsSection } from './EventsSection/EventsSection';
// import { FinancesSection } from './FinancesSection/FinancesSection';
import { TeamSection } from './TeamSection/TeamSection';

export interface AsideSectionsProps {}

export const AsideSections: React.FC<AsideSectionsProps> = () => {
  return (
    <>
      <EventsSection />
      {/* NOTIFY removed temporary, will be included in future */}
      {/* <FinancesSection /> */}
      <TeamSection />
    </>
  );
};
