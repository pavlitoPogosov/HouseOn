import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { EMDASH } from '@proscom/ui-utils';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_RECOVER_PASSWORD } from 'graphql/mutations/auth';
import { AuthResponseType, PasswordRecoverInput } from 'graphql/types';
import { useThrottledCallback } from 'use-debounce/lib';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { PASSWORD_FIELD_VALIDATION } from 'utils/formValidation/validationFields';
import { LOGIN_PAGE_ROUTE } from 'utils/routes';

import s from './PasswordResetPage.module.scss';

export interface PasswordResetPageProps {}

export const PasswordResetPage: React.FC<PasswordResetPageProps> = () => {
  const history = useHistory();
  const match = useRouteMatch<{ token: string }>();

  const intl = useIntl();

  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [recoverPassword, { loading, error }] = useMutationWithError<
    { result: AuthResponseType },
    { input: PasswordRecoverInput }
  >(MUTATION_RECOVER_PASSWORD, {
    onCompleted() {
      setIsPasswordUpdated(true);
    }
  });

  const handleSubmit = useThrottledCallback(
    ({ password }: { password: string }) => {
      recoverPassword({
        variables: {
          input: {
            token: match.params.token,
            new_password: password
          }
        }
      });
    },
    2000,
    { trailing: false }
  );

  const handleNavigateToSignIn = () => {
    history.push(LOGIN_PAGE_ROUTE);
  };

  const renderForm = () => (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ password: '' }}
      validationSchema={Yup.object().shape({
        password: PASSWORD_FIELD_VALIDATION
      })}
      onSubmit={handleSubmit}>
      {({ values }) => (
        <ExtentedForm>
          <InputField
            fieldContainerProps={{
              variant: 'secondary',
              label: intl.formatMessage({ id: 'auth.newPasswordLabel', defaultMessage: 'New password' })
            }}
            name="password"
            placeholder="6+ characters"
            disabled={loading}
            autoFocus
          />

          <ErrorMessage error={error ? DEFAULT_ERROR_MESSAGE : undefined} className={s.PasswordResetPage__error} />

          <Button
            color="green"
            type="submit"
            className={s.PasswordResetPage__btn}
            disabled={!values['password'].trim()}
            isLoading={loading}>
            <FormattedMessage id="auth.savePasswordButton" defaultMessage="Save password" />
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
            id: 'auth.passwordReset.pageTitle',
            defaultMessage: 'Password reset {symbol} HouseOn'
          },
          {
            symbol: EMDASH
          }
        )}
      />

      <div className={s.PasswordResetPage__container}>
        <Text
          text={
            isPasswordUpdated
              ? intl.formatMessage({ id: 'auth.passwordChange', defaultMessage: 'Password is changed' })
              : intl.formatMessage({ id: 'auth.enterPassword', defaultMessage: 'Enter new password' })
          }
          variant={TextPropsVariantsEnum.H2}
          as="h1"
          className={s.PasswordResetPage__title}
        />

        {!isPasswordUpdated ? (
          renderForm()
        ) : (
          <>
            <Text
              text={intl.formatMessage({
                id: 'auth.signInMessage',
                defaultMessage: 'Sing in to the system by new password.'
              })}
              className={s.PasswordResetPage__text}
              color="textSecondary"
            />

            <Button color="green" className={s.PasswordResetPage__btn} onClick={handleNavigateToSignIn}>
              {intl.formatMessage({ id: 'auth.signIn', defaultMessage: 'Sign in' })}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
