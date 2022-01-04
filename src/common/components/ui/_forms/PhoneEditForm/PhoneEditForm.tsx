import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { PhoneField } from 'common/components/ui/_formikComponents/PhoneField/PhoneField';
import { ContactType } from 'graphql/types';
import { PHONE_FIELD_VALIDATION, REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './PhoneEditForm.module.scss';

enum FieldNames {
  COMMENT = 'additional_info',
  NAME = 'title',
  PHONE = 'phone'
}

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  [FieldNames.PHONE]: PHONE_FIELD_VALIDATION,
  [FieldNames.NAME]: REQUIRED_FIELD_VALIDATION
});

export interface PhoneEditFormProps {
  phone: ContactType;
}

export const PhoneEditForm = React.forwardRef<any, PhoneEditFormProps>(({ phone }, ref) => (
  <Formik
    initialValues={phone}
    innerRef={ref}
    onSubmit={() => {}}
    validateOnBlur={false}
    validateOnChange={false}
    validationSchema={FORM_VALIDATION_SCHEMA}>
    <ExtentedForm disableScrollToError>
      <div className={s.halfInputContainer}>
        <InputField
          autoFocus
          fieldContainerProps={{
            containerClassName: s.halfInput,
            label: 'Name*'
          }}
          name={FieldNames.NAME}
          placeholder="Ex, Maria"
        />

        <PhoneField
          fieldContainerProps={{
            containerClassName: s.halfInput,
            label: 'Phone number*'
          }}
          name={FieldNames.PHONE}
          placeholder="X-XXX-XXX-XXXX"
        />
      </div>

      <InputField
        fieldContainerProps={{ label: 'Comment (not necessary)' }}
        name={FieldNames.COMMENT}
        placeholder="Type something..."
      />
    </ExtentedForm>
  </Formik>
));
