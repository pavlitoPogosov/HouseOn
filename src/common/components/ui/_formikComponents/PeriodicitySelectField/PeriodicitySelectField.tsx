import React from 'react';

import { useField } from 'formik';

import {
  PeriodicitySelect,
  PeriodicitySelectPeriodEnum,
  PeriodicitySelectProps,
  PeriodicitySelectValue
} from '../../PeriodicitySelect/PeriodicitySelect';

export type PeriodicitySelectFieldProps = { name: string } & Omit<PeriodicitySelectProps, 'value' | 'onChange'>;

export const PeriodicitySelectFieldInitialValue = {
  amount: 5,
  period: PeriodicitySelectPeriodEnum.DAY
};

export const PeriodicitySelectField: React.FC<PeriodicitySelectFieldProps> = ({ name, children, ...otherProps }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (newValue: PeriodicitySelectValue) => {
    helpers.setValue(newValue);
    helpers.setTouched(true);
  };

  return (
    <PeriodicitySelect
      value={field.value || PeriodicitySelectFieldInitialValue}
      onChange={handleChange}
      {...otherProps}
    />
  );
};
