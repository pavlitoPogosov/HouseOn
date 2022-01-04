import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button/Button';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_CHANGE_PASSWORD } from 'graphql/mutations/auth';
import { AuthResponseType, PasswordChangeInput } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { updateAuthDataAC } from 'redux/slices/authSlice/actionCreators';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { PASSWORD_CHANGE_ERROR_MESSAGE } from 'utils/errorMessages';
import { PASSWORD_FIELD_VALIDATION, REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './_styles.module.scss';

enum FieldsNames {
  OLD_PASSWORD = 'old_password',
  NEW_PASSWORD = 'new_password'
}
export const SETTINGS_PASSWORD_DIALOG_INITIAL_VALUES = {
  [FieldsNames.OLD_PASSWORD]: '',
  [FieldsNames.NEW_PASSWORD]: ''
};

const SETTINGS_PASSWORD_DIALOG_VALIDATION_SCHEMA = Yup.object().shape({
  [FieldsNames.OLD_PASSWORD]: REQUIRED_FIELD_VALIDATION,
  [FieldsNames.NEW_PASSWORD]: PASSWORD_FIELD_VALIDATION
});

export interface ProfileSettingsPasswordDialogProps {
  onClose: () => void;
}

export const ProfileSettingsPasswordDialog: React.FC<ProfileSettingsPasswordDialogProps> = ({ onClose }) => {
  const dispatch = useTypedDispatch();

  const [changePassword, { loading: changingPassword, error: errorChangingPassword }] = useMutationWithError<
    { result: AuthResponseType },
    { input: PasswordChangeInput }
  >(MUTATION_CHANGE_PASSWORD, {
    onCompleted({ result: newAuthData }) {
      dispatch(updateAuthDataAC(newAuthData));
      dispatch(createToast({ text: 'Password updated' }));

      onClose();
    }
  });

  const handleSubmit = (values: typeof SETTINGS_PASSWORD_DIALOG_INITIAL_VALUES) => {
    changePassword({
      variables: {
        input: {
          old_password: values[FieldsNames.OLD_PASSWORD],
          new_password: values[FieldsNames.NEW_PASSWORD]
        }
      }
    });
  };

  return (
    <Dialog
      isOpen
      icon={ColorfulIconTypes.STARS}
      title="Change password"
      onClose={onClose}
      maxWidth={424}
      isLoading={changingPassword}>
      <Formik
        initialValues={SETTINGS_PASSWORD_DIALOG_INITIAL_VALUES}
        validationSchema={SETTINGS_PASSWORD_DIALOG_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}>
        <ExtentedForm disableScrollToError>
          <Text
            text="After changing the password, you will be logged out of your account on all devices except the current one"
            variant={TextPropsVariantsEnum.BODY_M}
            className={s.ProfileSettingsDialog__text}
          />

          <InputField
            name={FieldsNames.OLD_PASSWORD}
            fieldContainerProps={{
              label: 'Old password',
              containerClassName: s.ProfileSettingsDialog__inputContainer
            }}
            disabled={changingPassword}
            enableTextVisibilityToggle
          />

          <InputField
            name={FieldsNames.NEW_PASSWORD}
            fieldContainerProps={{
              label: 'New password'
            }}
            disabled={changingPassword}
            enableTextVisibilityToggle
          />

          <ErrorMessage error={errorChangingPassword ? PASSWORD_CHANGE_ERROR_MESSAGE : undefined} />

          <div className={s.ProfileSettingsDialog__footer}>
            <Button
              className={s.ProfileSettingsDialog__singleBtn}
              isLoading={changingPassword}
              type="submit"
              color="orange"
              size="s">
              Confirm
            </Button>
          </div>
        </ExtentedForm>
      </Formik>
    </Dialog>
  );
};
