import React, { useRef } from 'react';
import ReactPhoneInput from 'react-phone-input-2';

import clsx from 'clsx';

import { FieldContainer, FieldContainerProps } from '../FieldContainer/FieldContainer';

import s from './PhoneInput.module.scss';

type TOwnProps = {
  fieldContainerProps?: Omit<FieldContainerProps, 'id'>;
  inputClassName?: string;
  isLoading?: boolean;
};

export type TPhoneInputProps = TOwnProps & React.InputHTMLAttributes<HTMLInputElement>;

let idCounter = 0;

// TODO add autoFocus
export const PhoneInput = React.forwardRef<any, TPhoneInputProps>((props, ref) => {
  const {
    disabled,
    fieldContainerProps,
    id,
    inputClassName,
    isLoading,
    onChange,
    placeholder = '',
    value,
    ...otherProps
  } = props;

  const _id = useRef(id || `phone-field-${++idCounter}`).current;
  const _disabled = disabled || isLoading;
  const _variant = fieldContainerProps?.variant || 'primary';

  const handleChange = (_: any, __: any, e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <FieldContainer {...fieldContainerProps} disabled={_disabled} id={_id} isLoading={isLoading} variant={_variant}>
      <ReactPhoneInput
        autoFormat
        inputProps={{
          ...otherProps,
          autoComplete: 'off',
          autoCorrect: 'off',
          className: clsx(
            s.PhoneInput,
            {
              [s.PhoneInput__disabled]: _disabled,
              [s.PhoneInput__primary]: _variant === 'primary',
              [s.PhoneInput__secondary]: _variant === 'secondary'
            },
            inputClassName
          ),
          disabled: _disabled,
          id: _id,
          placeholder
        }}
        jumpCursorToEnd
        onChange={handleChange}
        // @ts-ignore
        ref={ref}
        specialLabel=""
        value={value as string}
      />
    </FieldContainer>
  );
});
