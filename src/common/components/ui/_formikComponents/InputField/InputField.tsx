import React from 'react';

import { useField } from 'formik';

import { Input, TInputProps } from '../../Input/Input';

export type InputFieldProps = TInputProps & Required<Pick<TInputProps, 'name'>>;

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ children, name, ...otherProps }, ref) => {
    const [field, meta] = useField(name);

    return (
      <Input
        {...field}
        {...otherProps}
        fieldContainerProps={{
          ...otherProps.fieldContainerProps,
          error: meta.touched ? meta.error : undefined
        }}
        value={field.value || ''}
        ref={ref}
      >
        {children}
      </Input>
    );
  }
);
