import React from 'react';

import { useField } from 'formik';

import { CodeInput, CodeInputProps } from '../../CodeInput/CodeInput';

export type CodeInputFieldProps = Omit<CodeInputProps, 'onChange'> & { name: string };

export const CodeInputField: React.FC<CodeInputFieldProps> = ({ name, children, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: string) => {
    helpers.setValue(value);
    helpers.setTouched(true);
  };

  return (
    <CodeInput
      {...otherProps}
      {...field}
      error={meta.touched && meta.error ? meta.error : undefined}
      onChange={handleChange}
    />
  );
};
