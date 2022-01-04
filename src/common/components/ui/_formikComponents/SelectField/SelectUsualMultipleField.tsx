import React from 'react';

import { useField } from 'formik';

import { SelectUsualMultipleProps, ISelectUsualMultipleOption, SelectUsualMultiple } from 'common/components/ui/Select';

export type SelectUsualMultipleFieldProps = Omit<SelectUsualMultipleProps, 'value' | 'onChange'> & { name: string };

export const SelectUsualMultipleField: React.FC<SelectUsualMultipleFieldProps> = ({ name, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (newOptions: ISelectUsualMultipleOption[]) => {
    helpers.setValue(newOptions);
    helpers.setTouched(true);
  };

  return (
    <SelectUsualMultiple
      {...field}
      {...otherProps}
      error={meta.touched ? meta.error : undefined}
      value={field.value || ''}
      onChange={handleChange}
    />
  );
};
