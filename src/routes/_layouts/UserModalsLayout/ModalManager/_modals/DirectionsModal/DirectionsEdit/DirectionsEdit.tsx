import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { AddressInputField } from 'common/components/ui/_formikComponents/AddressInputField/AddressInputField';
import { DropzoneField } from 'common/components/ui/_formikComponents/DropzoneField/DropzoneField';
import { DropzonePreviewField } from 'common/components/ui/_formikComponents/DropzonePreviewField/DropzonePreviewField';
import { ExtentedForm } from 'common/components/ui/_formikComponents/ExtentedForm/ExtentedForm';
import { TextAreaField } from 'common/components/ui/_formikComponents/TextAreaField/TextAreaField';
import { TAddressInputValue } from 'common/components/ui/AddressInput/AddressInput';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { ADDRESS_FIELD_VALIDATION } from 'utils/formValidation/validationFields';

import s from './DirectionsEdit.module.scss';

export enum DirectionsEditInputNames {
  ADDITIONAL = 'additional',
  ADDRESS = 'address',
  PICTURES = 'pictures'
}

export const DIRECTIONS_FORM_INITIAL_VALUES = {
  [DirectionsEditInputNames.ADDRESS]: { address: '' } as TAddressInputValue,
  [DirectionsEditInputNames.PICTURES]: [],
  [DirectionsEditInputNames.ADDITIONAL]: ''
};

// TODO add validation for pictures
const DIRECTIONS_FORM_VALIDATION_SHEMA = Yup.object().shape({
  [DirectionsEditInputNames.ADDRESS]: ADDRESS_FIELD_VALIDATION
});
export interface IDirectionsEditProps {
  error: boolean;
  initialValues?: typeof DIRECTIONS_FORM_INITIAL_VALUES;
}

export const DirectionsEdit = React.forwardRef<any, IDirectionsEditProps>(({ error, initialValues }, ref) => {
  const handleSubmit = () => {};

  return (
    <Formik
      initialTouched={{ [DirectionsEditInputNames.ADDRESS]: true } as any}
      initialValues={initialValues || DIRECTIONS_FORM_INITIAL_VALUES}
      innerRef={ref}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={DIRECTIONS_FORM_VALIDATION_SHEMA}>
      <ExtentedForm>
        <AddressInputField
          fieldContainerProps={{ label: 'Type your house address' }}
          mapProps={{ mapContainerClassName: s.DirectionEdit__map }}
          name={DirectionsEditInputNames.ADDRESS}
        />

        <DropzoneField
          excludeRepeats
          fieldContainerProps={{ label: 'Drop a pictures (up to 3) which would help to find you out' }}
          maxFiles={3}
          name={DirectionsEditInputNames.PICTURES}
          size="m"
        />

        <DropzonePreviewField
          containerClassName={s.DirectionEdit__previewField}
          disableErrorShow
          isClosable
          name={DirectionsEditInputNames.PICTURES}
        />

        <TextAreaField
          enableAutoSize
          fieldContainerProps={{ label: 'Additional info (not necessary):' }}
          maxLetters={84}
          name={DirectionsEditInputNames.ADDITIONAL}
          placeholder="Type something..."
        />

        {error && <ErrorMessage error={DEFAULT_ERROR_MESSAGE} />}
      </ExtentedForm>
    </Formik>
  );
});
