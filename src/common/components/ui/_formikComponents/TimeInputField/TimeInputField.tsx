import React from 'react';

import { useField } from 'formik';
import moment from 'moment';

import { TimeInput, TimeInputProps } from '../../TimeInput/TimeInput';

export type TimeInputFieldProps = Omit<TimeInputProps, 'value' | 'onChange'> & { name: string };

export const TimeInputField: React.FC<TimeInputFieldProps> = ({ name, children, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: moment.Moment) => {
    helpers.setValue(value);
  };

  return (
    <TimeInput
      {...otherProps}
      {...field}
      fieldContainerProps={{
        ...otherProps.fieldContainerProps,
        error: meta.touched ? meta.error : undefined
      }}
      onChange={handleChange}
      value={field.value || moment()}
    />
  );
};
