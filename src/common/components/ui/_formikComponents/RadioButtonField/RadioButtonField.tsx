import React from 'react';

import { useField } from 'formik';

import { RadioButton, RadioButtonProps } from '../../RadioButton/RadioButton';

export type RadioButtonFieldProps = RadioButtonProps & { name: string; value: string };

export const RadioButtonField: React.FC<RadioButtonFieldProps> = ({ name, children, value, ...otherProps }) => {
  const [field, , helpers] = useField(name);

  const handleChange = () => {
    helpers.setValue(value);
  };

  return <RadioButton {...field} {...otherProps} checked={field.value === value} onChange={handleChange} />;
};
