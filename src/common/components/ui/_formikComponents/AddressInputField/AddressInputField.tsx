import React from 'react';

import { useField } from 'formik';

import { AddressInput, TAddressInputProps, TAddressInputValue } from 'common/components/ui/AddressInput/AddressInput';

export type TAddressInputFieldProps = Omit<TAddressInputProps, 'onChange' | 'value'> & {
  initialAddress?: string;
  name: string;
};

const defaultAddressInputValue: TAddressInputValue = { address: '' };

export const AddressInputField: React.FC<TAddressInputFieldProps> = (props) => {
  const { children, name, ...otherProps } = props;

  const [field, meta, helpers] = useField(name);

  const handleChange = (newValue: TAddressInputValue) => {
    helpers.setValue(newValue);
    helpers.setTouched(true);
  };

  return (
    <AddressInput
      {...otherProps}
      fieldContainerProps={{
        ...otherProps.fieldContainerProps,
        error: meta.touched ? (meta.error as any)?.address : undefined
      }}
      onChange={handleChange}
      value={field.value || defaultAddressInputValue}
    />
  );
};
