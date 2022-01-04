import React from 'react';

import { Formik, FormikTouched } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { TAddressInputValue } from 'common/components/ui/AddressInput/AddressInput';
import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';
import { ContactInput } from 'graphql/types';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { FIELD_REQUIRED_ERROR } from 'utils/formValidation/validationErrors';
import { ADDRESS_FIELD_VALIDATION, REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import { TEventData } from '../types';

import { EventFormAddressBlock } from './_blocks/EventFormAddressBlock';
import { EventFormContactsBlock } from './_blocks/EventFormContactsBlock';
import { EventFormControlsBlock } from './_blocks/EventFormControlsBlock';
import { EventFormDateBlock } from './_blocks/EventFormDateBlock';
import { EventFormHouseBlock } from './_blocks/EventFormHouseBlock';
import { EventFormTitleBlock } from './_blocks/EventFormTitleBlock';

export enum EventFormFields {
  ADDITIONAL_INFO = 'additional_info',
  CONTACTS = 'contacts',
  DATE = 'date',
  DESCRIPTION = 'description',
  DIRECTION = 'direction',
  ENDS_AT = 'ends_at',
  FILES = 'files',
  HOUSE_ID = 'house_id',
  IS_ALL_DAY = 'is_all_day',
  STARTS_AT = 'starts_at',
  TITLE = 'title',
  USES_HOUSE_DIRECTION = 'uses_house_direction'
}

export const EVENT_FORM_INITIAL_VALUES = {
  [EventFormFields.TITLE]: '',
  [EventFormFields.DESCRIPTION]: '',
  [EventFormFields.DATE]: {
    startDate: moment().add(1, 'days').startOf('day').subtract(1, 'day')
  } as IDatepickerValue,
  [EventFormFields.STARTS_AT]: moment().add(1, 'days').set('hour', 10).set('minute', 0),
  [EventFormFields.ENDS_AT]: moment().add(1, 'days').set('hour', 20).set('minute', 0),
  [EventFormFields.IS_ALL_DAY]: false,
  [EventFormFields.USES_HOUSE_DIRECTION]: true,
  [EventFormFields.DIRECTION]: { address: '' } as TAddressInputValue,
  [EventFormFields.FILES]: [] as File[],
  [EventFormFields.ADDITIONAL_INFO]: '',
  [EventFormFields.HOUSE_ID]: '',
  [EventFormFields.CONTACTS]: [] as ContactInput[]
};

export const EVENT_FORM_INITIAL_TOUCHED = {
  [EventFormFields.TITLE]: true,
  [EventFormFields.DESCRIPTION]: true,
  [EventFormFields.DATE]: true,
  [EventFormFields.STARTS_AT]: true,
  [EventFormFields.ENDS_AT]: true,
  [EventFormFields.IS_ALL_DAY]: true,
  [EventFormFields.USES_HOUSE_DIRECTION]: true,
  [EventFormFields.DIRECTION]: true,
  [EventFormFields.FILES]: true,
  [EventFormFields.ADDITIONAL_INFO]: true,
  [EventFormFields.HOUSE_ID]: true
};

const EVENT_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  [EventFormFields.TITLE]: REQUIRED_FIELD_VALIDATION,
  [EventFormFields.DESCRIPTION]: REQUIRED_FIELD_VALIDATION,
  [EventFormFields.STARTS_AT]: REQUIRED_FIELD_VALIDATION,
  [EventFormFields.ENDS_AT]: REQUIRED_FIELD_VALIDATION,
  [EventFormFields.DIRECTION]: Yup.object({}).when(EventFormFields.USES_HOUSE_DIRECTION, {
    is: false,
    then: ADDRESS_FIELD_VALIDATION
  }),
  [EventFormFields.ADDITIONAL_INFO]: Yup.string()
    .typeError(FIELD_REQUIRED_ERROR)
    .when(EventFormFields.USES_HOUSE_DIRECTION, {
      is: false,
      then: REQUIRED_FIELD_VALIDATION
    })
});

export interface IEventFormProps {
  error: boolean;
  event?: TEventData;
  id?: string;
  isEdit?: boolean;
  isLoading: boolean;

  onClickPreview: () => void;
  onSubmit: (values: TEventData) => void;
}

export const EventForm = React.forwardRef<any, IEventFormProps>((props, ref) => {
  const { error, event, isEdit, isLoading, onClickPreview, onSubmit } = props;

  const { accounts } = useTypedSelector((s) => s);

  const { availableAccounts, currentHouseId } = accounts || {};

  const { house } = availableAccounts?.find((account) => account.house_id === currentHouseId) || {};
  const { contacts: houseContacts, direction: houseDirection } = house || {};

  const isDirection = !!houseDirection?.address && !!houseDirection?.latitude && !!houseDirection?.longitude;

  const initialValues = event || {
    ...EVENT_FORM_INITIAL_VALUES,
    [EventFormFields.USES_HOUSE_DIRECTION]: isDirection,
    [EventFormFields.ADDITIONAL_INFO]: houseDirection?.additional_info
  };

  return (
    <Formik
      enableReinitialize
      initialTouched={EVENT_FORM_INITIAL_TOUCHED as FormikTouched<unknown>}
      initialValues={initialValues as TEventData}
      innerRef={ref}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={EVENT_FORM_VALIDATION_SCHEMA}
    >
      <ExtentedForm>
        <EventFormHouseBlock
          houseId={initialValues[EventFormFields.HOUSE_ID]}
          title={initialValues[EventFormFields.TITLE]}
        />

        <EventFormTitleBlock isLoading={isLoading} />

        <EventFormDateBlock isEdit={isEdit} isLoading={isLoading} />

        <EventFormAddressBlock
          address={initialValues[EventFormFields.DIRECTION]?.address || houseDirection?.address || undefined}
          isDirection={isDirection}
          isLoading={isLoading}
        />

        <EventFormContactsBlock houseContacts={houseContacts} />

        <EventFormControlsBlock error={error} isEdit={isEdit} isLoading={isLoading} onClickPreview={onClickPreview} />
      </ExtentedForm>
    </Formik>
  );
});
