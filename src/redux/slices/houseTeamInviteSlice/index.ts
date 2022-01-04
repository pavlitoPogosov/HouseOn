import { Moment } from 'moment';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface houseTeamInviteStoreState {
  lastInviteDeleted: Moment | null;
  countInvitedDelete: number;
}

const initialHouseTeamInviteState: houseTeamInviteStoreState = {
  lastInviteDeleted: null,
  countInvitedDelete: 0
};

export const houseTeamInviteSlice = createSlice({
  name: 'accounts',
  initialState: initialHouseTeamInviteState,
  reducers: {
    updateLastDeleted(state: houseTeamInviteStoreState, action: PayloadAction<{ time: Moment; count: number }>) {
      state.lastInviteDeleted = action.payload.time;
      state.countInvitedDelete = action.payload.count;
    }
  }
});

export default houseTeamInviteSlice.actions;
