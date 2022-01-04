import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { appHistory } from 'appHistory';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { EMDASH } from '@proscom/ui-utils';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button, ButtonLink } from 'common/components/ui/Button/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_START_PASSWORD_RECOVER_FLOW } from 'graphql/mutations/auth';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { EMAIL_FIELD_VALIDATION } from 'utils/formValidation/validationFields';
import { LOGIN_PAGE_ROUTE, SIGNUP_PAGE_ROUTE } from 'utils/routes';

import { BottomLink } from '../_common/BottomLink/BottomLink';
import { CenteredContainer } from '../_common/CenteredContainer/CenteredContainer';

import s from './PasswordRecoveryPage.module.scss';

export interface PasswordRecoveryPageProps {}

export const PasswordRecoveryPage: React.FC<PasswordRecoveryPageProps> = () => {
  const dispatch = useTypedDispatch();

  const intl = useIntl();

  const [isEmailSend, setIsEmailSend] = useState(false);
  const [startPasswordRecoveryFlow, { loading }] = useMutationWithError<{ result: boolean }, { email: string }>(
    MUTATION_START_PASSWORD_RECOVER_FLOW,
    {
      onCompleted() {
        setIsEmailSend(true);
      },
      onError() {
        dispatch(
          createToast({
            title: intl.formatMessage({
              id: 'auth.passwordRecovery.errorTitle',
              defaultMessage: 'Oops',
              description: 'Error title about failed to send email'
            }),
            text: intl.formatMessage({
              id: 'auth.passwordRecovery.errorText',
              defaultMessage: 'Failed to send email. Please, try again',
              description: 'Error text about failed to send email'
            }),
            type: 'error'
          })
        );
      }
    }
  );

  const handleSubmit = ({ email }: { email: string }) => {
    startPasswordRecoveryFlow({ variables: { email } });
  };

  const handleBackIconClick = () => {
    appHistory.goBack();
  };

  const renderForm = () => (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object().shape({ email: EMAIL_FIELD_VALIDATION })}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}>
      {({ values }) => (
        <ExtentedForm>
          <InputField
            fieldContainerProps={{
              label: 'E-mail',
              variant: 'secondary'
            }}
            name="email"
            disabled={loading}
            autoFocus
          />

          <Button
            color="green"
            type="submit"
            className={s.PasswordRecoveryPage__sendBtn}
            disabled={!values['email'].trim()}
            isLoading={loading}>
            Send
          </Button>
        </ExtentedForm>
      )}
    </Formik>
  );

  return (
    <>
      <Helmet
        title={intl.formatMessage(
          {
            id: 'auth.passwordRecovery.pageTitle',
            defaultMessage: 'Password recovery {symbol} HouseOn',
            description: 'Password recovery page'
          },
          {
            symbol: EMDASH
          }
        )}
      />

      <CenteredContainer>
        <div className={s.PasswordRecoveryPage__titleWrapper}>
          {appHistory.canGoBack() && !isEmailSend && (
            <IconCircle
              className={s.PasswordRecoveryPage__backIcon}
              width={32}
              height={32}
              icon={<ChevronLeftIcon />}
              onClick={handleBackIconClick}
            />
          )}

          <Text
            text={
              isEmailSend
                ? intl.formatMessage({ id: 'auth.checkEmail', defaultMessage: 'Check your e-mail' })
                : intl.formatMessage({
                    id: 'auth.changePassword',
                    defaultMessage: 'Change your password'
                  })
            }
            variant={TextPropsVariantsEnum.H2}
            as="h1"
          />
        </div>

        <Text
          text={
            isEmailSend
              ? intl.formatMessage({
                  id: 'auth.sentLink',
                  defaultMessage: 'We’ve sent a link to your e-mail. Pass through the link to change the password',
                  description: 'Notification about sent link to user e-mail'
                })
              : intl.formatMessage({
                  id: 'auth.requestSentLink',
                  defaultMessage: 'Enter an e-mail so we can send you a link to change the password',
                  description: 'User’s request to enter an e-mail to send a link with password recovery'
                })
          }
          variant={TextPropsVariantsEnum.BODY_L}
          color="textSecondary"
          className={s.PasswordRecoveryPage__text}
        />

        {!isEmailSend ? (
          renderForm()
        ) : (
          <ButtonLink
            className={s.PasswordRecoveryPage__notificationBtn}
            color="green"
            variant="primary"
            to={LOGIN_PAGE_ROUTE}>
            <FormattedMessage
              id="auth.sentLinkButton"
              defaultMessage="Ok, thanks"
              description="Button after sent link to user e-mail"
            />
          </ButtonLink>
        )}
      </CenteredContainer>

      <BottomLink
        text={intl.formatMessage({ id: 'auth.notMember', defaultMessage: 'Not a member?' })}
        hrefText={intl.formatMessage({ id: 'auth.signUp', defaultMessage: 'Sign up' })}
        href={SIGNUP_PAGE_ROUTE}
      />
    </>
  );
};
