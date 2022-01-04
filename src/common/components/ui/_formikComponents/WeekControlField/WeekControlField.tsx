import React from 'react';

import { useField } from 'formik';

import { WeekControl, WeekControlProps, IWeekControl } from '../../WeekControl/WeekControl';

export type WeekControlFieldProps = Omit<WeekControlProps, 'onChange' | 'days'> & {
  loading?: boolean;

  name: string;
};

export const WeekControlField: React.FC<WeekControlFieldProps> = ({ name, loading = false, ...otherProps }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (days: { [key in string]: IWeekControl }) => {
    helpers.setValue(days);
  };

  return <WeekControl days={field.value} onChange={handleChange} loading={loading} />;
};
