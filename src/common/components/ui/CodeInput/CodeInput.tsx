import React, { useImperativeHandle, useRef } from 'react';
import ReactCodeInput from 'react-verification-code-input';

import clsx from 'clsx';

import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './CodeInput.module.scss';

export interface CodeInputProps {
  fields?: number;
  autoFocus?: boolean;
  error?: string | null | undefined;
  value?: string;
  className?: string;
  disabled?: boolean;

  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
}

export interface CodeInputRef {
  focus: () => void;
}

export const CodeInput = React.forwardRef<CodeInputRef, CodeInputProps>(
  ({ className, error, autoFocus, value, disabled, fields = 6, onChange, onComplete }, ref) => {
    const codeInputRef = useRef<any>(null);
    const phoneXs = useMediaQuery('(max-width: 370px)');

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (codeInputRef.current) {
          const inputRefs = codeInputRef.current?.iRefs as { current: HTMLInputElement }[] | null;

          if (inputRefs) {
            inputRefs[inputRefs.length - 1]?.current?.focus();
          }
        }
      }
    }));

    return (
      <div className={className}>
        <ReactCodeInput
          type="number"
          fields={fields}
          className={clsx(s.CodeInput__input, error && s.CodeInput__inputError)}
          onChange={onChange}
          onComplete={onComplete}
          fieldWidth={phoneXs ? 34 : 41}
          fieldHeight={phoneXs ? 34 : 41}
          autoFocus={autoFocus}
          values={value?.split('')}
          disabled={disabled}
          ref={codeInputRef}
        />

        <ErrorMessage className={s.CodeInput__error} error={error} />
      </div>
    );
  }
);
