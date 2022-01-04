import React from 'react';
import { FormattedMessage } from 'react-intl';

import clsx from 'clsx';

import { THINSP } from '@proscom/ui-utils';
import { ReactComponent as AppleIcon } from 'assets/icons/apple.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from 'assets/icons/google.svg';
import { ReactComponent as LinkedInIcon } from 'assets/icons/linkedin.svg';
import { Button, ButtonProps } from 'common/components/ui/Button';
import { OAuthTypesEnum, useOAuth } from 'common/hooks/useOAuth';
import { usePlatform } from 'common/hooks/usePlatform';

import s from './ButtonsBlock.module.scss';

export interface ButtonsBlockProps {
  isSignIn?: boolean;
  isLoading?: boolean;
}

type ButtonBlockButton = ButtonProps & {
  content: React.ReactNode;
  oAuthType?: OAuthTypesEnum;
};

const COMMON_BUTTONS: ButtonBlockButton[] = [
  {
    className: s.ButtonsBlock__button,
    content: <FacebookIcon />,
    color: 'transparent-outlined',
    oAuthType: OAuthTypesEnum.FACEBOOK
  },
  {
    className: s.ButtonsBlock__button,
    content: <LinkedInIcon />,
    color: 'transparent-outlined',
    oAuthType: OAuthTypesEnum.LINKEDIN
  }
];

const getAppleButtons = (text: JSX.Element): ButtonBlockButton[] => {
  return [
    {
      className: clsx(s.ButtonsBlock__bigButton, s.ButtonBlock__appleButton),
      color: 'black',
      leftIcon: <AppleIcon />,
      content: (
        <>
          <span className={s.ButtonsBlock__hiddenText}>
            {text}
            {THINSP}
          </span>
          Apple
        </>
      )
    },
    {
      className: s.ButtonsBlock__button,
      content: <GoogleIcon />,
      color: 'transparent-outlined',
      oAuthType: OAuthTypesEnum.GOOGLE
    },
    ...COMMON_BUTTONS
  ];
};

const getUsualButtons = (text: JSX.Element): ButtonBlockButton[] => {
  return [
    {
      className: s.ButtonsBlock__bigButton,
      color: 'blue',
      leftIcon: <GoogleIcon />,
      oAuthType: OAuthTypesEnum.GOOGLE,
      content: (
        <>
          <span className={s.ButtonsBlock__hiddenText}>
            {text}
            {THINSP}
          </span>
          Google
        </>
      )
    },
    {
      className: s.ButtonsBlock__button,
      content: <AppleIcon />,
      color: 'transparent-outlined'
    },
    ...COMMON_BUTTONS
  ];
};

export const ButtonsBlock: React.FC<ButtonsBlockProps> = ({ isSignIn, isLoading }) => {
  const { isIOS, isMacOS } = usePlatform();
  const { handleStartOAuth } = useOAuth();

  const signIn = <FormattedMessage id="auth.button.signIn" defaultMessage="Sign in with" />;
  const signUp = <FormattedMessage id="auth.button.signUp" defaultMessage="Sign up with" />;
  const signMessage = isSignIn ? signIn : signUp;

  const buttonsToRender = isIOS || isMacOS ? getAppleButtons(signMessage) : getUsualButtons(signMessage);

  const handleButtonClick = (oAuthType: OAuthTypesEnum | undefined) => {
    return () => {
      if (!oAuthType) return;
      handleStartOAuth(oAuthType);
    };
  };

  return (
    <>
      <div className={s.ButtonsBlock__container}>
        {buttonsToRender.map((b, i) => (
          <Button
            key={i}
            className={b.className}
            leftIcon={b.leftIcon}
            color={b.color}
            disabled={isLoading}
            size="xl"
            onClick={handleButtonClick(b.oAuthType)}>
            {b.content}
          </Button>
        ))}
      </div>

      <div className={s.ButtonsBlock__divider}>
        <div className={s.ButtonsBlock__dividerText}>or</div>
      </div>
    </>
  );
};
