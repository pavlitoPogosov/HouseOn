import React from 'react';

import { useField } from 'formik';

import { PhoneInput, TPhoneInputProps } from 'common/components/ui/PhoneInput/PhoneInput';

export type PhoneFieldProps = TPhoneInputProps & Required<Pick<TPhoneInputProps, 'name'>>;

export const PhoneField: React.FC<PhoneFieldProps> = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  return (
    <PhoneInput
      {...field}
      {...otherProps}
      fieldContainerProps={{
        ...otherProps.fieldContainerProps,
        error: meta.touched ? meta.error : undefined
      }}
      value={field.value || ''}
    />
  );
};
