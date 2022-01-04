import { Routes, RouteType } from 'common/components/utils/Routes';
import {
  PASSWORD_RECOVERY_PAGE_ROUTE,
  PASSWORD_RESET_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE
} from 'utils/routes';

import { PasswordRecoveryPage } from './passwordRecovery/PasswordRecoveryPage';
import { PasswordResetPage } from './passwordReset/PasswordResetPage';
import { SignInPage } from './signIn/SignInPage';
import { SignUpPage } from './signUp/SignUpPage';

const authRoutes: RouteType[] = [
  {
    path: LOGIN_PAGE_ROUTE,
    exact: true,
    component: SignInPage
  },
  {
    path: SIGNUP_PAGE_ROUTE,
    exact: true,
    component: SignUpPage
  },
  {
    path: PASSWORD_RECOVERY_PAGE_ROUTE,
    exact: true,
    component: PasswordRecoveryPage
  },
  {
    path: PASSWORD_RESET_PAGE_ROUTE,
    exact: true,
    component: PasswordResetPage
  }
];

export const AuthRoutes = Routes(authRoutes);
