import React, { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { useUpdateEffect } from 'common/hooks/useUpdateEffect';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import authActions from 'redux/slices/authSlice';
import { loginWithEmailAC } from 'redux/slices/authSlice/actionCreators';
import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './SignInPagePassword.module.scss';

export interface SignInPagePasswordProps {
  email: string;
}

export const SignInPagePassword: React.FC<SignInPagePasswordProps> = ({ email }) => {
  const { loading, error } = useTypedSelector((s) => s.auth);
  const dispatch = useTypedDispatch();

  const intl = useIntl();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = ({ password }: { password: string }) => {
    dispatch(loginWithEmailAC({ email, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(authActions.setError(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error, loading]);

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={Yup.object().shape({ password: REQUIRED_FIELD_VALIDATION })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}>
      <ExtentedForm>
        <InputField
          name="password"
          fieldContainerProps={{
            label: intl.formatMessage({ id: 'auth.passwordLabel', defaultMessage: 'Password' }),
            variant: 'secondary'
          }}
          disabled={loading}
          ref={inputRef}
          enableTextVisibilityToggle
          autoFocus
        />

        <ErrorMessage error={error} className={s.SignInPagePassword__error} />

        <Button color="green" type="submit" className={s.SignInPagePassword__submitBtn} isLoading={loading}>
          <FormattedMessage id="app.enterButton" defaultMessage="Enter" />
        </Button>
      </ExtentedForm>
    </Formik>
  );
};
