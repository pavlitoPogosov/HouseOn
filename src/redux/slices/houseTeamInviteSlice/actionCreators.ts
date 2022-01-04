import moment from 'moment';

import { ReduxActionCreator } from 'redux/store';

import houseTeamInvite from './index';

export const handleDeleteAccountAC: ReduxActionCreator = () => {
  return async (dispatch, getState) => {
    const now = moment();
    const lastDeleted = getState().houseTeamInvite.lastInviteDeleted;
    const lastCount = getState().houseTeamInvite.countInvitedDelete;

    if (lastDeleted && lastDeleted.diff(now, 'seconds') < 180 && lastCount <= 3) {
      dispatch(houseTeamInvite.updateLastDeleted({ time: now, count: lastCount + 1 }));
    } else {
      dispatch(houseTeamInvite.updateLastDeleted({ time: now, count: 1 }));
    }
  };
};
