import React, { useRef } from 'react';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { Button } from 'common/components/ui/Button/Button';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_START_EMAIL_CHANGE_FLOW } from 'graphql/mutations/auth';
import { EmailChangeInput } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { EMAIL_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './_styles.module.scss';

export enum FieldNames {
  EMAIL = 'email'
}

const PROFILE_SETTINGS_EMAIL_DIALOG_INITIAL_VALUES = { [FieldNames.EMAIL]: '' };

const PROFILE_SETTINGS_EMAIL_DIALOG_VALIDATION_SCHEMA = Yup.object().shape({
  [FieldNames.EMAIL]: EMAIL_FIELD_VALIDATION
});

export interface ProfileSettingsEmailDialogProps {
  onClose: () => void;
}

export const ProfileSettingsEmailDialog: React.FC<ProfileSettingsEmailDialogProps> = ({ onClose }) => {
  const formikRef = useRef<FormikProps<{ [FieldNames.EMAIL]: string }> | null>(null);
  const dispatch = useTypedDispatch();

  const [startEmailChangeFlow, { loading, error }] = useMutationWithError<
    { result: boolean },
    { input: EmailChangeInput }
  >(MUTATION_START_EMAIL_CHANGE_FLOW, {
    onCompleted({ result }) {
      if (result && formikRef.current?.values[FieldNames.EMAIL]) {
        dispatch(
          createToast({
            text: `We sent a confirmation letter to the mail “${
              formikRef.current.values[FieldNames.EMAIL]
            }” Please follow the link from the letter for the changes to take effect`
          })
        );
        onClose();
      }
    },
    onError(error) {
      const errorCode = error?.graphQLErrors[0]?.extensions?.response?.statusCode;
      const errorMessage = error?.graphQLErrors[0].extensions?.response?.message;

      if (Boolean(errorCode && String(errorCode) === '400')) {
        formikRef.current?.setErrors({
          [FieldNames.EMAIL]: errorMessage
        });
      } else {
        formikRef.current?.setErrors({});
      }
    }
  });

  const handleSubmit = async ({ email }: typeof PROFILE_SETTINGS_EMAIL_DIALOG_INITIAL_VALUES) => {
    startEmailChangeFlow({
      variables: {
        input: {
          new_email: email
        }
      }
    });
  };

  return (
    <Dialog
      isOpen
      icon={ColorfulIconTypes.LETTER}
      title="Change email"
      onClose={onClose}
      maxWidth={424}
      isLoading={loading}>
      <Formik
        initialValues={PROFILE_SETTINGS_EMAIL_DIALOG_INITIAL_VALUES}
        validationSchema={PROFILE_SETTINGS_EMAIL_DIALOG_VALIDATION_SCHEMA}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        {({ errors }) => (
          <ExtentedForm disableScrollToError>
            <Text
              text="Please enter a new email address to which you will receive a confirmation email. The old mail will receive a notification and change the Email"
              variant={TextPropsVariantsEnum.BODY_M}
              className={s.ProfileSettingsDialog__text}
            />

            <InputField
              name="email"
              placeholder="email@gmail.com"
              fieldContainerProps={{
                label: 'New email'
              }}
              disabled={loading}
            />

            <ErrorMessage error={error && !errors[FieldNames.EMAIL] ? DEFAULT_ERROR_MESSAGE : undefined} />

            <div className={s.ProfileSettingsDialog__footer}>
              <Button onClick={onClose} type="button" color="orange" variant="secondary" size="s" disabled={loading}>
                Cancel
              </Button>

              <Button type="submit" color="orange" size="s" isLoading={loading}>
                Confirm
              </Button>
            </div>
          </ExtentedForm>
        )}
      </Formik>
    </Dialog>
  );
};
