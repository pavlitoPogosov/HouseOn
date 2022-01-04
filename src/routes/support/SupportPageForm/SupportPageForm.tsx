import React from 'react';
import { useIntl } from 'react-intl';

import { Formik, FormikTouched } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { Button } from 'common/components/ui/Button/Button';
import { EMAIL_FIELD_VALIDATION, REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './SupportPageForm.module.scss';

export enum SupportPageFormFields {
  NAME = 'name',
  EMAIL = 'email',
  MESSAGE = 'message'
}

export const CONTACT_SUPPORT_INITIAL_VALUES = {
  [SupportPageFormFields.NAME]: '',
  [SupportPageFormFields.EMAIL]: '',
  [SupportPageFormFields.MESSAGE]: ''
};

export const CONTACT_SUPPORT_INITIAL_TOUCHED = {
  [SupportPageFormFields.NAME]: true,
  [SupportPageFormFields.EMAIL]: true,
  [SupportPageFormFields.MESSAGE]: true
};

const CONTACT_SUPPORT_VALIDATION_SCHEMA = Yup.object().shape({
  [SupportPageFormFields.NAME]: REQUIRED_FIELD_VALIDATION,
  [SupportPageFormFields.EMAIL]: EMAIL_FIELD_VALIDATION,
  [SupportPageFormFields.MESSAGE]: REQUIRED_FIELD_VALIDATION
});

export interface SupportPageFormProps {
  onSubmit: (values: typeof CONTACT_SUPPORT_INITIAL_VALUES) => void;
}

export const SupportPageForm: React.FC<SupportPageFormProps> = ({ onSubmit }) => {
  const intl = useIntl();

  return (
    <Formik
      initialValues={CONTACT_SUPPORT_INITIAL_VALUES}
      initialTouched={CONTACT_SUPPORT_INITIAL_TOUCHED as FormikTouched<{}>}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={CONTACT_SUPPORT_VALIDATION_SCHEMA}
      onSubmit={onSubmit}>
      <ExtentedForm>
        <div className={s.SupportPageForm__formGroup}>
          <InputField
            name={SupportPageFormFields.NAME}
            placeholder={intl.formatMessage({
              id: 'support.form.name.placeholder',
              defaultMessage: 'Your name...'
            })}
            fieldContainerProps={{
              label: intl.formatMessage({
                id: 'support.form.name.label',
                defaultMessage: 'Your name...'
              }),
              containerClassName: s.SupportPageForm__formInput
            }}
          />
          <InputField
            name={SupportPageFormFields.EMAIL}
            placeholder={intl.formatMessage({
              id: 'support.form.email.placeholder',
              defaultMessage: 'Your email...'
            })}
            fieldContainerProps={{
              label: 'Email',
              containerClassName: s.SupportPageForm__formInput
            }}
          />
        </div>

        <TextAreaField
          name={SupportPageFormFields.MESSAGE}
          placeholder={intl.formatMessage({
            id: 'support.form.message.placeholder',
            defaultMessage: 'Type message...'
          })}
          textAreaClassName={s.SupportPageForm__textarea}
          fieldContainerProps={{
            label: intl.formatMessage({
              id: 'support.form.message.label',
              defaultMessage: 'Message'
            })
          }}
        />

        <Button color="green">{intl.formatMessage({ id: 'app.button.send', defaultMessage: 'Send' })}</Button>
      </ExtentedForm>
    </Formik>
  );
};
