import React from 'react';

import { useField } from 'formik';

import { Checkbox, CheckboxProps } from '../../Checkbox/Checkbox';

export type CheckboxFieldProps = CheckboxProps & Required<Pick<CheckboxProps, 'name'>>;

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ children, name, ...otherProps }) => {
  const [field, , helpers] = useField(name);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);

    helpers.setTouched(true);
  };

  return (
    <Checkbox {...field} {...otherProps} checked={field.value || false} onChange={onChange}>
      {children}
    </Checkbox>
  );
};
