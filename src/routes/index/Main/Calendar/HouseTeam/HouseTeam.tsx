import React from 'react';

import { TCalendarScheduleRow } from '../Calendar';

import { HouseTeamDesktop } from './HouseTeamDesktop/HouseTeamDesktop';
import { HouseTeamMobile } from './HouseTeamMobile/HouseTeamMobile';

export interface HouseTeamProps {
  datepickerCmp: React.ReactNode;
  rows: TCalendarScheduleRow[];
  shouldAdapt: boolean;
}

export const HouseTeam: React.FC<HouseTeamProps> = ({ datepickerCmp, rows, shouldAdapt }) => {
  if (shouldAdapt) {
    return <HouseTeamMobile datepickerCmp={datepickerCmp} rows={rows} />;
  }

  return <HouseTeamDesktop rows={rows} />;
};
