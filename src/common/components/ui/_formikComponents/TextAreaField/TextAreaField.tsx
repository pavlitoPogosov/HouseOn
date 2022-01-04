import React from 'react';

import { useField } from 'formik';

import { TextArea, TTextAreaProps } from '../../TextArea/TextArea';

export type TTextAreaFieldProps = TTextAreaProps & Required<Pick<TTextAreaProps, 'name'>>;

export const TextAreaField: React.FC<TTextAreaFieldProps> = ({ children, name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const value = field.value || '';

  return (
    <TextArea
      {...field}
      value={value}
      {...otherProps}
      fieldContainerProps={{
        ...otherProps.fieldContainerProps,
        error: meta.touched ? meta.error : undefined
      }}
    >
      {children}
    </TextArea>
  );
};
