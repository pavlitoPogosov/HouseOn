import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useToggle } from '@proscom/ui-react';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { TextPhoneField } from 'common/components/ui/_formikComponents/TextPhoneField/TextPhoneField';
import { Button } from 'common/components/ui/Button/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { sendSMSCodeAC } from 'redux/slices/authSlice/actionCreators';
import { ButtonsBlock } from 'routes/authRoutes/_common/ButtonsBlock/ButtonsBlock';
import { CodeConfirmModal } from 'routes/authRoutes/_common/CodeConfirmModal/CodeConfirmModal';
import { getPhoneWithoutMask } from 'utils/formValidation/stringUtils';
import { EMAIL_PHONE_FIELD_VALIDATION } from 'utils/formValidation/validationFields';
import { NOTIFICATION_SETTING_ROUTE, PRIVACY_POLICY_ROUTE, TERMS_OF_SERVICE_ROUTE } from 'utils/routes';

import s from './SignUpLogin.module.scss';

export interface SignUpLoginProps {
  initialLogin: string;
  onEnterLogin: (email: string) => void;
}

export const SignUpLogin: React.FC<SignUpLoginProps> = ({ onEnterLogin, initialLogin }) => {
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
    <>
      <Text
        text={intl.formatMessage({ id: 'auth.signUpLogin.title', defaultMessage: 'Sign up to HouseOn' })}
        variant={TextPropsVariantsEnum.H2}
        as="h1"
      />
      <ButtonsBlock />

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
                label: intl.formatMessage({ id: 'auth.emailPhoneLabel', defaultMessage: 'Email or Phone' })
              }}
              name="login"
              isLoading={loading}
              isInitiallyPhoneInput={!initialLogin.includes('@')}
              autoFocus
            />

            <Button color="green" type="submit" className={s.SignUpLogin__submitBtn} disabled={loading}>
              <FormattedMessage id="app.button.next" defaultMessage="Next" />
            </Button>

            <ErrorMessage error={error} className={s.SignUpLogin__error} />

            <Text
              className={s.SignUpLogin__checkboxContainer}
              variant={TextPropsVariantsEnum.BODY_M}
              as="div"
              color="textTretiary">
              <FormattedMessage
                id="auth.signUpLogin.text"
                defaultMessage="By clicking Next you automatically are okay with our"
              />
              <br />
              <a href={TERMS_OF_SERVICE_ROUTE} target="_blank" rel="noreferrer">
                {` ${intl.formatMessage({ id: 'app.termsService', defaultMessage: 'Terms of Service' })},`}
              </a>
              <a href={PRIVACY_POLICY_ROUTE} target="_blank" rel="noreferrer">
                {` ${intl.formatMessage({ id: 'app.privacyPolicy', defaultMessage: 'Privacy Policy' })}, `}
              </a>
              <FormattedMessage id="auth.separatorLinks" defaultMessage="and our default" />
              <a href={NOTIFICATION_SETTING_ROUTE} target="_blank" rel="noreferrer">
                {` ${intl.formatMessage({
                  id: 'app.notificationsSettings',
                  defaultMessage: 'Notifications Settings'
                })}`}
              </a>
            </Text>

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
    </>
  );
};
