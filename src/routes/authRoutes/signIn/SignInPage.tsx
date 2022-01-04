import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { EMDASH } from '@proscom/ui-utils';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { SIGNUP_PAGE_ROUTE } from 'utils/routes';

import { BottomLink } from '../_common/BottomLink/BottomLink';
import { ButtonsBlock } from '../_common/ButtonsBlock/ButtonsBlock';
import { CenteredContainer } from '../_common/CenteredContainer/CenteredContainer';

import { SignInPageLogin } from './SignInPageLogin/SignInPageLogin';
import { SignInPagePassword } from './SignInPagePassword/SignInPagePassword';

import s from './SignInPage.module.scss';

export enum SignInSteps {
  LOGIN = 'login',
  PASSWORD = 'password'
}

export interface SignInPageProps {}

export const SignInPage: React.FC<SignInPageProps> = () => {
  const [savedEmailLogin, setSavedEmailLogin] = useState('');
  const [activeStep, setActiveStep] = useState(SignInSteps.LOGIN);

  const intl = useIntl();

  const { loading } = useTypedSelector((s) => s.auth);

  const handleBack = () => {
    setActiveStep(SignInSteps.LOGIN);
  };

  const handleEnterLogin = (email: string) => {
    setSavedEmailLogin(email);
    setActiveStep(SignInSteps.PASSWORD);
  };

  return (
    <>
      <Helmet
        title={intl.formatMessage(
          { id: 'auth.signIn.pageTitle', defaultMessage: 'Log in {symbol} HouseOn' },
          { symbol: EMDASH }
        )}
      />

      <CenteredContainer>
        <div className={s.SignIn__titleWrapper}>
          {activeStep === SignInSteps.PASSWORD && (
            <IconCircle
              onClick={!loading ? handleBack : undefined}
              width={32}
              height={32}
              icon={<ChevronLeftIcon />}
              className={s.SignIn__backIcon}
              shadow="l"
            />
          )}

          <Text
            text={intl.formatMessage({ id: 'auth.signIn.title', defaultMessage: 'Log in to HouseOn' })}
            variant={TextPropsVariantsEnum.H2}
            as="h1"
          />
        </div>

        <ButtonsBlock isLoading={loading} isSignIn />

        {activeStep === SignInSteps.LOGIN ? (
          <SignInPageLogin initialLogin={savedEmailLogin} onEnterLogin={handleEnterLogin} />
        ) : (
          <SignInPagePassword email={savedEmailLogin} />
        )}
      </CenteredContainer>

      <BottomLink
        href={SIGNUP_PAGE_ROUTE}
        hrefText={intl.formatMessage({ id: 'auth.signUp', defaultMessage: 'Sign up' })}
        text={intl.formatMessage({ id: 'auth.alreadyMember', defaultMessage: 'Already a member?' })}
      />
    </>
  );
};
