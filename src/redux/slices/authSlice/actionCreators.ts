import { appHistory } from 'appHistory';
import { apolloClient } from 'appStores';
import moment from 'moment';

import { singleton } from '@proscom/ui-utils';
import {
  MUTATION_USE_REFRESH_TOKEN,
  MUTATION_LOGIN,
  MUTATION_SIGNUP,
  MUTATION_LOGOUT,
  MUTATION_START_SMS_AUTH_FLOW,
  MUTATION_VERIFY_SMS_AUTH_CODE
} from 'graphql/mutations/auth';
import { AuthResponseType, UserAuthTokenType } from 'graphql/types';
import authActions from 'redux/slices/authSlice';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { ReduxActionCreator } from 'redux/store';
import { getInvitePageQuery } from 'routes/invite/InvitePage';
import {
  DEFAULT_ERROR_MESSAGE,
  INVALID_CODE_ERROR_MESSAGE,
  LOGIN_FAILED_ERROR_MESSAGE,
  SIGN_UP_FAILED_ERROR_MESSAGE
} from 'utils/errorMessages';
import { LOCAL_STORAGE_KEY_AUTH } from 'utils/localStorageKeys';
import { WIZARD_PAGE_ROUTE, INVITE_PAGE_ROUTE } from 'utils/routes';

import {
  fetchAvailableAccountsAC,
  handleNoAvailableAccountsErrorAC,
  setDefaultAccountDataAC
} from '../accountsSlice/actionCreators';
import {
  isAbleToSetCodeAgainCooldownAC,
  removeSendCodeAgainCooldownAC,
  setSendCodeAgainCooldownAC
} from '../sendCodeAgainSlice/actionCreators';

const isRefreshTokenValid = (token: UserAuthTokenType | undefined) => {
  const momentExpiresAt = moment(token?.expires_at);

  return momentExpiresAt.isValid() && momentExpiresAt.isAfter(Date.now());
};

export const logoutAC: ReduxActionCreator = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth?.authData?.refreshToken?.token;

      if (token) {
        apolloClient.mutate<{ logout: boolean }, { token: string }>({
          mutation: MUTATION_LOGOUT,
          variables: { token: token as string }
        });
      }
    } catch {
    } finally {
      apolloClient.cache.reset();
      localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH);

      dispatch(authActions.logout());
      dispatch(authActions.setInitiallyLoaded(true));
    }
  };
};

export const loadInitialDataAC: ReduxActionCreator = () => {
  return async (dispatch, getState) => {
    try {
      await dispatch(refreshTokenAC());

      if (getState().auth.authData) {
        await dispatch(fetchAvailableAccountsAC());

        if (!getState().accounts.availableAccounts?.length) {
          throw new Error();
        } else {
          dispatch(setDefaultAccountDataAC());
        }
      }
    } catch (e) {
      dispatch(logoutAC());
    } finally {
      dispatch(authActions.setInitiallyLoaded(true));
    }
  };
};

export const updateAuthDataAC: ReduxActionCreator<AuthResponseType> = (newAuthData) => {
  return async (dispatch) => {
    const expires_at = newAuthData?.refreshToken.expires_at?.utc().toISOString();

    const authData = {
      ...newAuthData,
      refreshToken: {
        ...newAuthData.refreshToken,
        expires_at
      }
    };

    localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(authData));
    dispatch(authActions.setAuthData(newAuthData));
  };
};

export const refreshTokenSingletonRequest = singleton(async (refreshToken: string | undefined) => {
  const { data } = await apolloClient.mutate<{ useRefreshToken: AuthResponseType }, { token: string }>({
    mutation: MUTATION_USE_REFRESH_TOKEN,
    variables: { token: refreshToken || '' }
  });

  return data;
});

export const handleSocialAuthAC: ReduxActionCreator<any> = (e) => {
  return async (dispatch, getState) => {
    try {
      dispatch(authActions.setLoading(true));
      const refreshToken = JSON.parse(e?.data?.body || '')?.token?.token;

      const data = await refreshTokenSingletonRequest(refreshToken);

      if (!data || !data.useRefreshToken) {
        throw new Error();
      }

      dispatch(updateAuthDataAC(data.useRefreshToken));
      await dispatch(fetchAvailableAccountsAC());

      if (getInvitePageQuery()) {
        appHistory.push(INVITE_PAGE_ROUTE.replace(':inviteId', getInvitePageQuery()!));
        return;
      }

      if (!getState().accounts.availableAccounts?.length) {
        dispatch(handleNoAvailableAccountsErrorAC());
      } else {
        dispatch(setDefaultAccountDataAC());
      }
    } catch {
      dispatch(
        createToast({
          type: 'error',
          text: DEFAULT_ERROR_MESSAGE
        })
      );
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const refreshTokenAC: ReduxActionCreator = () => {
  return async (dispatch) => {
    try {
      const savedAuthData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_AUTH)!) as
        | Partial<AuthResponseType>
        | null
        | undefined;
      const isTokenValid = isRefreshTokenValid(savedAuthData?.refreshToken);

      if (!isTokenValid || !savedAuthData) throw new Error();

      const authData = await refreshTokenSingletonRequest(savedAuthData.refreshToken?.token);
      if (!authData?.useRefreshToken) throw new Error();

      dispatch(updateAuthDataAC(authData.useRefreshToken));
    } catch {
      dispatch(logoutAC());
    }
  };
};

export const loginWithEmailAC: ReduxActionCreator<{ email: string; password: string }> = (variables) => {
  return async (dispatch, getState) => {
    try {
      dispatch(authActions.setLoading(true));

      const { data } = await apolloClient.mutate<
        { signInWithEmail: AuthResponseType },
        { email: string; password: string }
      >({
        mutation: MUTATION_LOGIN,
        variables
      });

      if (!data?.signInWithEmail) throw new Error();

      dispatch(updateAuthDataAC(data.signInWithEmail));
      await dispatch(fetchAvailableAccountsAC());

      if (getInvitePageQuery()) {
        appHistory.push(INVITE_PAGE_ROUTE.replace(':inviteId', getInvitePageQuery()!));
        dispatch(authActions.setError(null));
        return;
      }

      if (!getState().accounts.availableAccounts?.length) {
        dispatch(handleNoAvailableAccountsErrorAC());
      } else {
        dispatch(setDefaultAccountDataAC());
      }

      dispatch(authActions.setError(null));
    } catch {
      dispatch(authActions.setError(LOGIN_FAILED_ERROR_MESSAGE));
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const signUpWithEmailAC: ReduxActionCreator<{ email: string; password: string }> = (variables) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setLoading(true));

      const { data } = await apolloClient.mutate<{ signUpWithEmail: AuthResponseType }, { input: typeof variables }>({
        mutation: MUTATION_SIGNUP,
        variables: { input: variables }
      });

      if (!data?.signUpWithEmail) {
        throw new Error();
      }

      dispatch(updateAuthDataAC(data.signUpWithEmail));

      if (getInvitePageQuery()) {
        appHistory.push(INVITE_PAGE_ROUTE.replace(':inviteId', getInvitePageQuery()!));
      } else {
        dispatch(authActions.toggleWizardAccess());
        appHistory.push(WIZARD_PAGE_ROUTE);
      }

      dispatch(authActions.setError(null));
    } catch {
      dispatch(authActions.setError(SIGN_UP_FAILED_ERROR_MESSAGE));
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const sendSMSCodeAC: ReduxActionCreator<{ phone: string; isLogin?: boolean }, boolean> = ({
  phone,
  isLogin
}) => {
  return async (dispatch) => {
    try {
      const isAbleToSendCodeAgain = await dispatch(isAbleToSetCodeAgainCooldownAC({ phone }));

      if (!isAbleToSendCodeAgain) {
        return true;
      }

      dispatch(authActions.setLoading(true));

      const { data } = await apolloClient.mutate<{ startSmsAuthFlow: number }, { input: { phone: string } }>({
        mutation: MUTATION_START_SMS_AUTH_FLOW,
        variables: { input: { phone } }
      });

      if (!data?.startSmsAuthFlow) {
        throw new Error();
      }

      await dispatch(setSendCodeAgainCooldownAC({ phone, seconds: data.startSmsAuthFlow }));

      dispatch(authActions.setError(null));
      dispatch(authActions.setLoading(false));
      return true;
    } catch {
      dispatch(authActions.setError(isLogin ? LOGIN_FAILED_ERROR_MESSAGE : SIGN_UP_FAILED_ERROR_MESSAGE));
      return false;
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const verifySMSCodeAC: ReduxActionCreator<{ code: string; phone: string }, boolean> = ({ code, phone }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(authActions.setLoading(true));

      const { data: authData } = await apolloClient.mutate<
        { result: AuthResponseType },
        { input: { phone: string; code: string } }
      >({
        mutation: MUTATION_VERIFY_SMS_AUTH_CODE,
        variables: { input: { phone, code } }
      });

      if (!authData?.result) {
        throw new Error();
      }

      dispatch(updateAuthDataAC(authData.result));
      await dispatch(fetchAvailableAccountsAC());

      dispatch(authActions.setCodeConfirmError(null));
      dispatch(removeSendCodeAgainCooldownAC());

      if (getInvitePageQuery()) {
        appHistory.push(INVITE_PAGE_ROUTE.replace(':inviteId', getInvitePageQuery()!));
        return true;
      }

      if (!getState().accounts.availableAccounts?.length) {
        dispatch(handleNoAvailableAccountsErrorAC());
      } else {
        dispatch(setDefaultAccountDataAC());
      }

      return true;
    } catch {
      dispatch(authActions.setCodeConfirmError(INVALID_CODE_ERROR_MESSAGE));
      dispatch(authActions.setAuthData(null));
      localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH);
      return false;
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};
