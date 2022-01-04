import React from 'react';

import { Formik } from 'formik';
import moment from 'moment';

import { CheckboxField } from 'common/components/ui/_formikComponents/CheckboxField/CheckboxField';
import { DateInputField } from 'common/components/ui/_formikComponents/DateInputField/DateInputField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { InputField } from 'common/components/ui/_formikComponents/InputField/InputField';
import { PhoneField } from 'common/components/ui/_formikComponents/PhoneField/PhoneField';
import { RadioButtonField } from 'common/components/ui/_formikComponents/RadioButtonField/RadioButtonField';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './GuestAddForm.module.scss';

export enum GuestInputNames {
  NAME = 'name',
  EMAIL = 'email',
  PHONE = 'phone',
  DATES = 'dates',
  ALL_DAYS = 'all_days',
  ACCESS_RIGHTS = 'access_rights'
}

export const GUEST_ADD_FORM_INITIAL_VALUES = {
  [GuestInputNames.NAME]: '',
  [GuestInputNames.EMAIL]: '',
  [GuestInputNames.PHONE]: '',
  [GuestInputNames.DATES]: {
    startDate: moment(),
    endDate: moment().add(7, 'days')
  },
  [GuestInputNames.ALL_DAYS]: false,
  [GuestInputNames.ACCESS_RIGHTS]: '0'
};

export interface GuestAddFormProps {}

export const GuestAddForm = React.forwardRef<any, GuestAddFormProps>((props, ref) => {
  const handleSubmit = () => {};

  return (
    <Formik initialValues={GUEST_ADD_FORM_INITIAL_VALUES} onSubmit={handleSubmit} innerRef={ref}>
      {({ values }) => (
        <ExtentedForm>
          <InputField
            name={GuestInputNames.NAME}
            fieldContainerProps={{
              label: 'Name'
            }}
            placeholder="Your Name"
          />

          <InputField
            name={GuestInputNames.EMAIL}
            fieldContainerProps={{
              label: 'Email'
            }}
            type="email"
            placeholder="Your email"
          />

          <PhoneField
            name={GuestInputNames.PHONE}
            fieldContainerProps={{
              label: 'Phone number'
            }}
            placeholder="x-xxx-xxx-xxxx"
          />

          <DateInputField
            name={GuestInputNames.DATES}
            fieldContainerProps={{
              label: 'Dates'
            }}
            disabled={values[GuestInputNames.ALL_DAYS]}
          />

          <CheckboxField name={GuestInputNames.ALL_DAYS} text="All days" />

          <Text variant={TextPropsVariantsEnum.H3} as="h6" text="Access rights" className={s.GuestAddForm__title} />

          <RadioButtonField name={GuestInputNames.ACCESS_RIGHTS} text="View only" value="0" />
          <RadioButtonField name={GuestInputNames.ACCESS_RIGHTS} text="Manage" value="1" />
        </ExtentedForm>
      )}
    </Formik>
  );
});
