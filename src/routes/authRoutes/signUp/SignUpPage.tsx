import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { EMDASH } from '@proscom/ui-utils';
import { LOGIN_PAGE_ROUTE } from 'utils/routes';

import { BottomLink } from '../_common/BottomLink/BottomLink';
import { CenteredContainer } from '../_common/CenteredContainer/CenteredContainer';

import { SignUpLogin } from './SignUpLogin/SignUpLogin';
import { SignUpPassword } from './SignUpPassword/SignUpPassword';

export enum SignUpSteps {
  LOGIN = 'login',
  PASSWORD = 'password'
}

export interface SignUpPageProps {}

export const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [savedEmailLogin, setSavedEmailLogin] = useState('');
  const [activeStep, setActiveStep] = useState(SignUpSteps.LOGIN);

  const intl = useIntl();

  const handleEmailEnter = (email: string) => {
    setSavedEmailLogin(email);
    setActiveStep(SignUpSteps.PASSWORD);
  };

  const handleBack = () => {
    setActiveStep(SignUpSteps.LOGIN);
  };

  return (
    <>
      <Helmet
        title={intl.formatMessage(
          {
            id: 'auth.signUp.pageTitle',
            defaultMessage: 'Sign up {symbol} HouseOn'
          },
          {
            symbol: EMDASH
          }
        )}
      />

      <CenteredContainer>
        {activeStep === SignUpSteps.LOGIN ? (
          <SignUpLogin initialLogin={savedEmailLogin} onEnterLogin={handleEmailEnter} />
        ) : (
          <SignUpPassword onBack={handleBack} email={savedEmailLogin} />
        )}
      </CenteredContainer>

      <BottomLink
        href={LOGIN_PAGE_ROUTE}
        hrefText={intl.formatMessage({ id: 'auth.logIn', defaultMessage: 'Log in' })}
        text={intl.formatMessage({ id: 'auth.alreadyMember', defaultMessage: 'Already a member?' })}
      />
    </>
  );
};
