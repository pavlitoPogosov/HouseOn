import React from 'react';
import ReactPhoneInput, { PhoneInputProps } from 'react-phone-input-2';

import clsx from 'clsx';

import s from './PhoneViewer.module.scss';

type OwnProps = {
  phone?: string | undefined;
  className?: string | undefined;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export type PhoneViewerProps = OwnProps & Omit<PhoneInputProps, 'inputProps'>;

export const PhoneViewer: React.FC<PhoneViewerProps> = ({ className, phone = '', ...otherProps }) => {
  return (
    <ReactPhoneInput
      {...otherProps}
      inputProps={{
        ...otherProps.inputProps,
        className: clsx(s.PhoneViewer__input, otherProps.inputProps?.className, className)
      }}
      specialLabel=""
      value={phone}
      disabled
    />
  );
};
