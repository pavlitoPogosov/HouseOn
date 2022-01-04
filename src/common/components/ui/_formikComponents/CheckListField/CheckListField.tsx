import React from 'react';

import { useField } from 'formik';

import { CheckList, ICheckListProps, ICheckListOption } from '../../CheckList/CheckList';

export type CheckListFieldProps = Omit<ICheckListProps, 'options' | 'onChange'> & { name: string };

export const CheckListField: React.FC<CheckListFieldProps> = ({ children, name, ...otherProps }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (newOptions: ICheckListOption[]) => {
    helpers.setValue(newOptions);
    helpers.setTouched(true);
  };

  return <CheckList onChange={handleChange} options={field.value || []} {...otherProps} />;
};
