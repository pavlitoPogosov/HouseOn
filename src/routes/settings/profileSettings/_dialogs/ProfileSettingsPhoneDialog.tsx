import React, { useCallback, useRef, useState } from 'react';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { ApolloError } from '@apollo/client';
import { CodeInputField } from 'common/components/ui/_formikComponents/CodeInputField/CodeInputField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { PhoneField } from 'common/components/ui/_formikComponents/PhoneField/PhoneField';
import { Button } from 'common/components/ui/Button/Button';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { SendCodeAgain } from 'common/components/ui/SendCodeAgain/SendCodeAgain';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_CHANGE_PHONE, MUTATION_START_PHONE_CHANGE_FLOW } from 'graphql/mutations/auth';
import { SmsAuthInput } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import {
  isAbleToSetCodeAgainCooldownAC,
  removeSendCodeAgainCooldownAC,
  setSendCodeAgainCooldownAC
} from 'redux/slices/sendCodeAgainSlice/actionCreators';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { getPhoneWithoutMask } from 'utils/formValidation/stringUtils';
import { FIELD_CODE_INVALID_ERROR } from 'utils/formValidation/validationErrors';
import { CODE_INPUT_FIELD_VALIDATION, PHONE_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './_styles.module.scss';

enum ModalTypes {
  PHONE = 'phone',
  CODE_CONFIRM = 'code_confirm'
}

enum FieldsNames {
  PHONE = 'phone',
  CODE = 'code',
  INTERNAL_ERROR = 'internal_error'
}

const FORM_INITIAL_TOUCHED = {
  [FieldsNames.PHONE]: true,
  [FieldsNames.CODE]: true
};

const FORM_INITIAL_VALUES = {
  [FieldsNames.PHONE]: '',
  [FieldsNames.CODE]: ''
};

const PHONE_FORM_VALIDATION_SCHEMA = Yup.object().shape({ [FieldsNames.PHONE]: PHONE_FIELD_VALIDATION });

const CODE_CONFIRM_VALIDATION_SHEMA = Yup.object().shape({ [FieldsNames.CODE]: CODE_INPUT_FIELD_VALIDATION });
export interface ProfileSettingsPhoneDialogProps {
  onClose: () => void;
}

const isInvalidCodeError = (error: ApolloError) => {
  const errorCode = error?.graphQLErrors[0]?.extensions?.response?.statusCode;

  return Boolean(errorCode && String(errorCode) === '400');
};

export const ProfileSettingsPhoneDialog: React.FC<ProfileSettingsPhoneDialogProps> = ({ onClose }) => {
  const dispatch = useTypedDispatch();
  const formikRef = useRef<FormikProps<{ [key in string]: any }> | null>(null);

  const [activeModalType, setActiveModalType] = useState(ModalTypes.PHONE);
  const isPhoneModal = activeModalType === ModalTypes.PHONE;

  const [sendSmsCode, { loading: sendingSmsCode }] = useMutationWithError<{ result: number }, { input: SmsAuthInput }>(
    MUTATION_START_PHONE_CHANGE_FLOW,
    {
      onCompleted() {
        formikRef.current?.setErrors({});
      },
      onError() {
        formikRef.current?.setErrors({
          [FieldsNames.INTERNAL_ERROR]: DEFAULT_ERROR_MESSAGE
        });
      }
    }
  );
  const [changePhone, { loading: changingPhone }] = useMutationWithError<{ result: boolean }, { code: string }>(
    MUTATION_CHANGE_PHONE,
    {
      onCompleted() {
        dispatch(createToast({ text: 'Phone number updated' }));
        dispatch(removeSendCodeAgainCooldownAC());

        onClose();
      },
      onError(error) {
        const isCodeError = isInvalidCodeError(error);

        if (isCodeError) {
          formikRef.current?.setErrors({
            [FieldsNames.CODE]: FIELD_CODE_INVALID_ERROR
          });
        } else {
          formikRef.current?.setErrors({
            [FieldsNames.INTERNAL_ERROR]: DEFAULT_ERROR_MESSAGE
          });
        }
      }
    }
  );

  const handleModalTypeToggle = useCallback(() => {
    formikRef.current?.setErrors({});
    setActiveModalType(isPhoneModal ? ModalTypes.CODE_CONFIRM : ModalTypes.PHONE);
  }, [isPhoneModal]);

  const sendSms = useCallback(
    async (phone: string) => {
      const { data } = await sendSmsCode({ variables: { input: { phone: getPhoneWithoutMask(phone) } } });

      if (data?.result) {
        await dispatch(setSendCodeAgainCooldownAC({ phone, seconds: data.result }));
        setActiveModalType(ModalTypes.CODE_CONFIRM);
      }
    },
    [sendSmsCode, dispatch]
  );

  const handleCodeSendAgain = useCallback(() => {
    if (formikRef.current?.values) {
      formikRef.current.setErrors({});
      formikRef.current.setValues({
        ...formikRef.current.values,
        [FieldsNames.CODE]: ''
      });

      sendSms(formikRef.current.values.phone || '');
    }
  }, [sendSms]);

  const handleSendSMS = useCallback(
    async ({ phone }) => {
      const isAbleToSendCode = await dispatch(isAbleToSetCodeAgainCooldownAC({ phone }));

      if (!isAbleToSendCode) {
        return setActiveModalType(ModalTypes.CODE_CONFIRM);
      }

      sendSms(phone);
    },
    [sendSms, dispatch]
  );

  const handleCodeConfirm = useCallback(
    ({ code }) => {
      changePhone({ variables: { code } });
    },
    [changePhone]
  );

  const renderCodeForm = useCallback(
    (formikProps: FormikProps<{ [x: string]: any }>) => (
      <>
        <Text
          text={`We sent a verification code to ${formikProps.values[FieldsNames.PHONE]}`}
          variant={TextPropsVariantsEnum.BODY_M}
        />

        <NavigationLink
          as="div"
          text="Edit number"
          className={s.ProfileSettingsDialog__link}
          onClick={!changingPhone ? handleModalTypeToggle : undefined}
          isUnderline
        />

        <CodeInputField name={FieldsNames.CODE} className={s.ProfileSettingsDialog__codeInput} autoFocus />

        <ErrorMessage
          className={s.ProfileSettingsDialog__marginBottom}
          error={formikProps.errors[FieldsNames.INTERNAL_ERROR] as string}
        />

        <SendCodeAgain onSendAgain={!changingPhone ? handleCodeSendAgain : undefined} />

        <div className={s.ProfileSettingsDialog__footer}>
          <Button onClick={onClose} size="s" color="orange" type="button" variant="secondary" disabled={changingPhone}>
            Cancel
          </Button>

          <Button type="submit" size="s" color="orange" isLoading={changingPhone}>
            Change number
          </Button>
        </div>
      </>
    ),
    [onClose, handleModalTypeToggle, handleCodeSendAgain, changingPhone]
  );

  const renderPhoneForm = useCallback(
    (formikProps: FormikProps<{ [x: string]: any }>) => (
      <>
        <Text
          text="Please enter a new phone number and a confirmation code will be sent to it"
          variant={TextPropsVariantsEnum.BODY_M}
          className={s.ProfileSettingsDialog__text}
        />

        <PhoneField
          name={ModalTypes.PHONE}
          fieldContainerProps={{
            label: 'Email or Phone'
          }}
          placeholder="x-xxx-xxx-xxxx"
          disabled={sendingSmsCode}
          autoFocus
        />

        <ErrorMessage error={formikProps.errors[FieldsNames.INTERNAL_ERROR] as string} />

        <div className={s.ProfileSettingsDialog__footer}>
          <Button onClick={onClose} size="s" color="orange" type="button" variant="secondary" disabled={sendingSmsCode}>
            Cancel
          </Button>

          <Button type="submit" size="s" color="orange" isLoading={sendingSmsCode}>
            Get code
          </Button>
        </div>
      </>
    ),
    [onClose, sendingSmsCode]
  );

  return (
    <Dialog
      isOpen
      icon={ColorfulIconTypes.PHONE}
      title="Change phone number"
      onClose={onClose}
      maxWidth={424}
      isLoading={sendingSmsCode || changingPhone}>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={isPhoneModal ? PHONE_FORM_VALIDATION_SCHEMA : CODE_CONFIRM_VALIDATION_SHEMA}
        initialTouched={FORM_INITIAL_TOUCHED}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={isPhoneModal ? handleSendSMS : handleCodeConfirm}
        innerRef={formikRef}
        enableReinitialize>
        {(formikProps) => (
          <ExtentedForm disableScrollToError>
            {isPhoneModal ? renderPhoneForm(formikProps) : renderCodeForm(formikProps)}
          </ExtentedForm>
        )}
      </Formik>
    </Dialog>
  );
};
