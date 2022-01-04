import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import authActions from 'redux/slices/authSlice';
import { signUpWithEmailAC } from 'redux/slices/authSlice/actionCreators';
import { FIELD_PASSWORDS_NOT_MATCH_ERROR } from 'utils/formValidation/validationErrors';
import { PASSWORD_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './SignUpPassword.module.scss';

export interface SignUpPasswordProps {
  email: string;
  onBack: () => void;
}

export const SignUpPassword: React.FC<SignUpPasswordProps> = ({ email, onBack }) => {
  const { error, loading } = useTypedSelector((s) => s.auth);
  const dispatch = useTypedDispatch();

  const intl = useIntl();

  const handleSubmit = ({ password }: { password: string }) => {
    dispatch(signUpWithEmailAC({ email, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(authActions.setError(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={s.SignUpPassword__titleWrapper}>
        <IconCircle
          onClick={!loading ? onBack : undefined}
          width={32}
          height={32}
          icon={<ChevronLeftIcon />}
          className={s.SignUpPassword__backIcon}
          shadow="l"
        />

        <Text
          text={intl.formatMessage({ id: 'auth.signUpPassword.title', defaultMessage: 'Sign up to HouseOn' })}
          variant={TextPropsVariantsEnum.H2}
          as="h1"
        />
      </div>

      <Formik
        initialValues={{ password: '', password_repeat: '' }}
        validationSchema={Yup.object().shape({
          password: PASSWORD_FIELD_VALIDATION,
          password_repeat: PASSWORD_FIELD_VALIDATION.oneOf([Yup.ref('password'), null], FIELD_PASSWORDS_NOT_MATCH_ERROR)
        })}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}>
        <ExtentedForm>
          <InputField
            name="password"
            fieldContainerProps={{
              label: intl.formatMessage({ id: 'auth.createPasswordLabel', defaultMessage: 'Create password' }),
              variant: 'secondary',
              containerClassName: s.SignUpPassword__fieldContainer
            }}
            disabled={loading}
            enableTextVisibilityToggle
            autoFocus
          />
          <InputField
            name="password_repeat"
            fieldContainerProps={{
              label: intl.formatMessage({ id: 'auth.repeatPasswordLabel', defaultMessage: 'Repeat password' }),
              variant: 'secondary',
              containerClassName: s.SignUpPassword__fieldContainer
            }}
            disabled={loading}
            enableTextVisibilityToggle
          />

          <ErrorMessage error={error} className={s.SignUpPassword__error} />

          <Button color="green" type="submit" className={s.SignUpPassword__submitBtn} isLoading={loading}>
            <FormattedMessage id="auth.createAccountButton" defaultMessage="Create Account" />
          </Button>
        </ExtentedForm>
      </Formik>
    </>
  );
};
