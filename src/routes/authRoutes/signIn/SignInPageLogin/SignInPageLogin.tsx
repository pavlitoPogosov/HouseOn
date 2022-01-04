import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useToggle } from '@proscom/ui-react';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { TextPhoneField } from 'common/components/ui/_formikComponents/TextPhoneField/TextPhoneField';
import { Button } from 'common/components/ui/Button/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { sendSMSCodeAC } from 'redux/slices/authSlice/actionCreators';
import { CodeConfirmModal } from 'routes/authRoutes/_common/CodeConfirmModal/CodeConfirmModal';
import { getPhoneWithoutMask } from 'utils/formValidation/stringUtils';
import { EMAIL_PHONE_FIELD_VALIDATION } from 'utils/formValidation/validationFields';
import { PASSWORD_RECOVERY_PAGE_ROUTE } from 'utils/routes';

import s from './SignInPageLogin.module.scss';

export interface SignInPageLoginProps {
  initialLogin: string;
  onEnterLogin: (login: string) => void;
}

export const SignInPageLogin: React.FC<SignInPageLoginProps> = ({ initialLogin, onEnterLogin }) => {
  const { error, loading, codeConfirmError } = useTypedSelector((s) => s.auth);
  const dispatch = useTypedDispatch();

  const modalToggler = useToggle();

  const intl = useIntl();

  const handleSubmit = async ({ login }: { login: string }) => {
    if (login.includes('@')) {
      onEnterLogin(login);
    } else {
      const isSended = await dispatch(
        sendSMSCodeAC({
          phone: getPhoneWithoutMask(login)
        })
      );

      if (isSended) {
        modalToggler.set();
      }
    }
  };

  return (
    <Formik
      initialValues={{ login: initialLogin }}
      validationSchema={Yup.object().shape({ login: EMAIL_PHONE_FIELD_VALIDATION })}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}>
      {({ values }) => (
        <ExtentedForm>
          <TextPhoneField
            fieldContainerProps={{
              variant: 'secondary',
              label: intl.formatMessage({ id: 'auth.emailPhoneLabel', defaultMessage: 'Email or Phone' }),
              helpTextHref: !loading ? PASSWORD_RECOVERY_PAGE_ROUTE : undefined,
              helpText: intl.formatMessage({ id: 'auth.forgotPassword', defaultMessage: 'Forgot your password?' })
            }}
            name="login"
            isLoading={loading}
            autoFocus
            isInitiallyPhoneInput={!initialLogin.includes('@')}
          />

          <Button color="green" type="submit" className={s.SignInLogin__submitBtn} disabled={loading}>
            <FormattedMessage id="app.button.next" defaultMessage="Next" />
          </Button>

          <ErrorMessage error={error} className={s.SignInLogin__error} />

          <CodeConfirmModal
            isOpen={modalToggler.value}
            onClose={modalToggler.unset}
            isLoading={loading}
            phone={values['login']}
            error={codeConfirmError}
          />
        </ExtentedForm>
      )}
    </Formik>
  );
};
