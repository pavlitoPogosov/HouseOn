import { appHistory } from 'appHistory';
import { apolloClient } from 'appStores';

import { QUERY_AVAILABLE_ACCOUNTS } from 'graphql/queries/accounts';
import { AccountType } from 'graphql/types';
import authActions from 'redux/slices/authSlice';
import { ReduxActionCreator } from 'redux/store';
import { LOCAL_STORAGE_KEY_LAST_HOUSE_ID } from 'utils/localStorageKeys';
import { HOUSE_PAGE_ROUTE, INDEX_PAGE_ROUTE, isHousePage, isIndexPage, WIZARD_PAGE_ROUTE } from 'utils/routes';

import { logoutAC } from '../authSlice/actionCreators';
import { createToast } from '../toastSlice/actionCreators';

import accountsActions from './index';

export const handleNoAvailableAccountsErrorAC: ReduxActionCreator = () => {
  return async (dispatch) => {
    dispatch(authActions.toggleWizardAccess());
    appHistory.push(WIZARD_PAGE_ROUTE);

    dispatch(createToast({ text: 'Please, create house in order to join HouseOn' }));
  };
};

export const fetchAvailableAccountsAC: ReduxActionCreator = () => {
  return async (dispatch, getState) => {
    const { authData } = getState().auth;

    if (!authData?.user) {
      throw new Error();
    }

    const { data: availableAccounts } = await apolloClient.query<{ result: Array<AccountType> }>({
      query: QUERY_AVAILABLE_ACCOUNTS,
      fetchPolicy: 'no-cache'
    });

    dispatch(accountsActions.setAvailableAccounts(availableAccounts.result));
  };
};

export const setDefaultAccountDataAC: ReduxActionCreator = () => {
  return async (dispatch, getState) => {
    const { availableAccounts } = getState().accounts;

    if (!availableAccounts) {
      throw new Error();
    }

    const lastHouseId = localStorage.getItem(LOCAL_STORAGE_KEY_LAST_HOUSE_ID);
    const lastAccountId = availableAccounts.find((a) => a.house_id === lastHouseId)?.id;

    if (lastHouseId && lastAccountId) {
      dispatch(accountsActions.setCurrentAccountId(lastAccountId));
      dispatch(accountsActions.setCurrentHouseId(lastHouseId));

      localStorage.setItem(LOCAL_STORAGE_KEY_LAST_HOUSE_ID, lastHouseId);
    } else {
      const defaultAccount = availableAccounts[0];

      dispatch(accountsActions.setCurrentAccountId(defaultAccount.id));
      dispatch(accountsActions.setCurrentHouseId(defaultAccount.house_id));

      localStorage.setItem(LOCAL_STORAGE_KEY_LAST_HOUSE_ID, defaultAccount.house_id);
    }
  };
};

export const setCurrentAccountIdAC: ReduxActionCreator<string> = (accountId) => {
  return async (dispatch, getState) => {
    const { availableAccounts } = getState().accounts;

    if (!availableAccounts) {
      dispatch(logoutAC());
      return;
    }

    const houseId = availableAccounts.find((a) => a.id === accountId)?.house?.id;

    if (houseId) {
      dispatch(accountsActions.setCurrentAccountId(accountId));
      dispatch(accountsActions.setCurrentHouseId(houseId));

      if (isHousePage() || isIndexPage()) {
        const defaultAccount = availableAccounts[0];

        appHistory.replace(
          defaultAccount.house_id === houseId ? INDEX_PAGE_ROUTE : HOUSE_PAGE_ROUTE.replace(':id(\\d+)', houseId)
        );
      }

      localStorage.setItem(LOCAL_STORAGE_KEY_LAST_HOUSE_ID, houseId);
    } else {
      dispatch(
        createToast({
          title: 'Oops!',
          text: 'Failed to switch household. Please, try again',
          type: 'error'
        })
      );
    }
  };
};

export const handleIndexPageLoadAC: ReduxActionCreator = () => {
  return async (dispatch, getState) => {
    const { availableAccounts, currentHouseId } = getState().accounts;

    if (!availableAccounts || !currentHouseId) {
      return dispatch(handleNoAvailableAccountsErrorAC());
    }

    const defaultAccount = availableAccounts[0];

    if (availableAccounts.length === 0 && !isIndexPage()) {
      appHistory.replace(INDEX_PAGE_ROUTE);
    }

    if (isHousePage()) {
      const houseId = appHistory.location.pathname.split('/')[2];
      const isAccountExists = availableAccounts.find((a) => a.house_id === houseId);

      if (!isAccountExists) {
        appHistory.replace(INDEX_PAGE_ROUTE);

        dispatch(accountsActions.setCurrentAccountId(defaultAccount.id));
        dispatch(accountsActions.setCurrentHouseId(defaultAccount.house_id));
      }
    }

    if (isIndexPage()) {
      if (defaultAccount.house_id !== currentHouseId) {
        const houseIdToSet = availableAccounts.find((a) => a.house_id === currentHouseId)?.house_id;

        if (!houseIdToSet) {
          return dispatch(logoutAC());
        }

        appHistory.replace(HOUSE_PAGE_ROUTE.replace(':id(\\d+)', houseIdToSet));
      }
    }
  };
};
