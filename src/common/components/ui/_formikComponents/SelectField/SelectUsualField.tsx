import React from 'react';

import { useField } from 'formik';

import { SelectUsual, ISelectPrimaryOption, SelectUsualProps } from 'common/components/ui/Select';

export type SelectUsualFieldProps = Omit<SelectUsualProps, 'onChange' | 'selectedOption'> & { name: string };

export const SelectUsualField: React.FC<SelectUsualFieldProps> = ({ name, children, options, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);

  const handleSelectChange = (option: ISelectPrimaryOption) => {
    helpers.setValue(option.value);
    helpers.setTouched(true);
  };

  const selectedOption = options.find((opt) => opt.value === field.value);

  return (
    <SelectUsual
      error={meta.touched ? meta.error : undefined}
      selectedOption={selectedOption}
      options={options}
      onChange={handleSelectChange}
      {...otherProps}
    />
  );
};
