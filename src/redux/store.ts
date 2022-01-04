import { Iterable } from 'immutable';
import moment from 'moment';

import { configureStore, combineReducers, PayloadAction, isPlain } from '@reduxjs/toolkit';
// eslint-disable-next-line
import { SerializableStateInvariantMiddlewareOptions } from '@reduxjs/toolkit/src/serializableStateInvariantMiddleware';

import { userSlice } from 'redux/slices/userSlice';

import { accountSlice } from './slices/accountsSlice';
import { authSlice } from './slices/authSlice';
import { houseTeamInviteSlice } from './slices/houseTeamInviteSlice';
import { sendCodeAgainSlice } from './slices/sendCodeAgainSlice';
import { toastSlice } from './slices/toastSlice';

const combinedReducer = combineReducers({
  accounts: accountSlice.reducer,
  auth: authSlice.reducer,
  houseTeamInvite: houseTeamInviteSlice.reducer,
  sendCodeAgain: sendCodeAgainSlice.reducer,
  toast: toastSlice.reducer,
  user: userSlice.reducer
});

const rootReducer = (state: any, action: PayloadAction<void>) => {
  if (action.type === authSlice.actions.logout().type) {
    state = {};
  }

  return combinedReducer(state, action);
};

const isSerializable = (value: any) =>
  Iterable.isIterable(value) || isPlain(value) || moment.isMoment(value) || value instanceof moment.locale;

const getEntries: (value: any) => [string, any][] = (value: any) =>
  moment.isMoment(value) ? Object.entries(value).filter(([key, value]) => !key.startsWith('_')) : Object.entries(value);

const serializableCheck: SerializableStateInvariantMiddlewareOptions = {
  getEntries,
  isSerializable
};

export const setupReduxStore = () =>
  configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck }),
    reducer: rootReducer
  });

export type ReduxRootState = ReturnType<ReturnType<typeof setupReduxStore>['getState']>;
export type ReduxDispatch = ReturnType<typeof setupReduxStore>['dispatch'];
export type ReduxActionCreator<A = void, R = void> = (
  args: A
) => (dispatch: ReduxDispatch, getState: () => ReduxRootState) => Promise<R>;
