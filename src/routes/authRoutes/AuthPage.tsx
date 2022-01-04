import React from 'react';

import AuthImg from 'assets/images/Auth.png';
import { Logo } from 'common/components/ui/Logo/Logo';
import { SelectLanguage } from 'common/components/ui/Select';
import { ErrorBoundary } from 'common/components/utils/ErrorBoundary';

import { AuthRoutes } from './AuthRoutes';

import s from './AuthPage.module.scss';

export interface AuthPageProps {}

export const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    <div className={s.AuthLayout__wrapper}>
      <div className={s.AuthLayout__content}>
        <div className={s.AuthLayout__form}>
          <Logo className={s.AuthLayout__logo} />

          <SelectLanguage containerClassName={s.AuthLayout__languageSelect} />

          <ErrorBoundary>
            <AuthRoutes />
          </ErrorBoundary>
        </div>

        <div className={s.AuthLayout__imgWrapper}>
          <img className={s.AuthLayout__img} src={AuthImg} alt="" />
        </div>
      </div>
    </div>
  );
};
