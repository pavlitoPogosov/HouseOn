import React from 'react';

import { useField } from 'formik';
import moment from 'moment';

import { DateInput, DateInputProps } from 'common/components/ui/DateInput/DateInput';
import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';

export type DateInputFieldProps = Omit<DateInputProps, 'value' | 'onChange'> & { name: string };

const defaultDate: IDatepickerValue = {
  endDate: null,
  startDate: moment()
};

export const DateInputField: React.FC<DateInputFieldProps> = ({ children, name, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);

  const handleDateInputChange = (value: IDatepickerValue) => {
    helpers.setValue(value);
  };

  return (
    <DateInput
      {...field}
      {...otherProps}
      fieldContainerProps={{
        ...otherProps.fieldContainerProps,
        error: meta.touched ? meta.error : undefined
      }}
      onChange={handleDateInputChange}
      value={field.value || defaultDate}
    >
      {children}
    </DateInput>
  );
};
