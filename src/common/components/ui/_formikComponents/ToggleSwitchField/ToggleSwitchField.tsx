import React from 'react';

import { useField } from 'formik';

import { ToggleSwitch, ToggleSwitchProps } from '../../ToggleSwitch/ToggleSwitch';

export type ToggleSwitchFieldProps = ToggleSwitchProps & { name: string };

export const ToggleSwitchField: React.FC<ToggleSwitchFieldProps> = ({ name, children, ...otherProps }) => {
  const [field] = useField(name);

  return <ToggleSwitch {...field} checked={field.value} {...otherProps} />;
};
