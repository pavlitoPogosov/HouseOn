import React, { useRef } from 'react';

import { Input, TInputProps } from 'common/components/ui/Input/Input';
import { PhoneInput, TPhoneInputProps } from 'common/components/ui/PhoneInput/PhoneInput';
import { useStateWithCallback } from 'common/hooks/useStateWithCallback';

type TOwnProps = {
  isInitiallyPhoneInput?: boolean;
};

export type TTextPhoneInputProps = TOwnProps & (TInputProps | TPhoneInputProps);

export const TextPhoneInput: React.FC<TTextPhoneInputProps> = ({ isInitiallyPhoneInput, onChange, ...otherProps }) => {
  const [isPhoneInput, setIsPhoneInput] = useStateWithCallback(isInitiallyPhoneInput);

  const inputRef = useRef<any>(null);

  const handleInputTypeChange = (valueToHandle: string) => {
    const filteredValue = valueToHandle
      .replace(/ /g, '')
      .replace(/[(){}]/g, '')
      .replace(/[*+/-]/g, '');

    if (filteredValue) {
      if (!Number(filteredValue)) {
        setIsPhoneInput(false, () => {
          inputRef.current?.focus();
        });
      } else {
        setIsPhoneInput(true, () => {
          inputRef.current?.numberInputRef?.focus();
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputTypeChange(e.target.value);

    if (e.target.value.length === 1 && e.target.value === '+') {
      onChange &&
        onChange({
          ...e,
          target: {
            ...e.target,
            value: ''
          }
        });
    } else {
      onChange && onChange(e);
    }
  };

  const handleInputChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputTypeChange(e.target.value);
    onChange && onChange(e);
  };

  return isPhoneInput ? (
    <PhoneInput
      {...otherProps}
      onChange={handleInputChange}
      onChangeCapture={handleInputChangeCapture}
      ref={inputRef}
      type="text"
    />
  ) : (
    <Input {...otherProps} onChange={handleInputChange} ref={inputRef} />
  );
};
