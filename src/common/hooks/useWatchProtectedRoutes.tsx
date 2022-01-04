import { useLayoutEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router';

import { appHistory } from 'appHistory';

import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import {
  AUTH_URLS,
  INDEX_PAGE_ROUTE,
  INVITE_PAGE_ROUTE,
  isPublicEventPage,
  LOGIN_PAGE_ROUTE,
  PASSWORD_RECOVERY_PAGE_ROUTE
} from 'utils/routes';

const getCorrectRoute = (string: string | any[]) => (string[string.length - 1] === '/' ? string.slice(-1) : string);

export const useWatchProtectedRoutes = () => {
  const [{ authData, isInitiallyLoaded, loading }, { availableAccounts }] = useTypedSelector((s) => [
    s.auth,
    s.accounts
  ]);
  const location = useLocation();
  const isInvitationPage = useRouteMatch<{ inviteId: string }>(INVITE_PAGE_ROUTE);

  useLayoutEffect(() => {
    if (isInitiallyLoaded && !loading) {
      const { pathname } = location;
      const isAuthRouteActive =
        AUTH_URLS.map((url) => getCorrectRoute(url)).includes(getCorrectRoute(pathname)) ||
        // case for dynamic email link
        pathname.includes(PASSWORD_RECOVERY_PAGE_ROUTE);

      const isPublic = isPublicEventPage();

      if (isInvitationPage && isInvitationPage.params.inviteId && !authData) {
        appHistory.push({
          pathname: LOGIN_PAGE_ROUTE,
          search: '?inviteId=' + isInvitationPage.params.inviteId
        });
        return;
      }

      if (!authData && !availableAccounts && !isAuthRouteActive && !isPublic) {
        appHistory.push(LOGIN_PAGE_ROUTE);
        return;
      }

      if (authData && availableAccounts && isAuthRouteActive) {
        appHistory.push(INDEX_PAGE_ROUTE);
        return;
      }
    }
  }, [isInitiallyLoaded, loading, location, authData, availableAccounts, isInvitationPage]);
};
