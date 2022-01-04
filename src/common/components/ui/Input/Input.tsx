import React, { useRef } from 'react';

import clsx from 'clsx';

import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as EyeLineThroughIcon } from 'assets/icons/eyeLineThrough.svg';
import { useStateWithCallback } from 'common/hooks/useStateWithCallback';
import { mergeRefs } from 'utils/mergeRefs';

import { FieldContainer, FieldContainerProps } from '../FieldContainer/FieldContainer';

import s from './Input.module.scss';

type TOwnProps = {
  defaultValue?: string | number | readonly string[];
  enableTextVisibilityToggle?: boolean;
  fieldContainerProps?: FieldContainerProps;
  icon?: React.ReactNode;
  allowOnlyNumbers?: boolean;
  inputClassName?: string;
  isLoading?: boolean;
};

export type TInputProps = TOwnProps & React.InputHTMLAttributes<HTMLInputElement>;

let idCounter = 0;

export const Input = React.forwardRef<HTMLInputElement, TInputProps>((props, ref) => {
  const {
    children,
    disabled,
    enableTextVisibilityToggle,
    fieldContainerProps,
    icon,
    id,
    inputClassName,
    isLoading,
    type,
    allowOnlyNumbers,
    ...otherProps
  } = props;

  const _id = useRef(id || `text-field-${++idCounter}`).current;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isTextVisible, setTextVisibility] = useStateWithCallback(false);

  const toggleTextVisibility = () => {
    setTextVisibility(
      (prev) => !prev,
      () => {
        if (inputRef.current) {
          inputRef.current.focus();

          const { length } = inputRef.current.value;
          inputRef.current.setSelectionRange(length, length);
        }
      }
    );
  };

  const onClickIcon = () => {
    inputRef.current?.focus();
  };

  const _inputType = enableTextVisibilityToggle ? (isTextVisible ? type : 'password') : type;
  const _disabled = isLoading || disabled;

  const _variant = fieldContainerProps?.variant || 'primary';

  const onWheel = ($event: React.WheelEvent<HTMLInputElement>) => {
    if (_inputType === 'number') {
      // @ts-ignore
      $event.target.blur();
    }

    if (otherProps.onWheel) {
      otherProps.onWheel($event);
    }
  };

  const onKeyDown = ($event: React.KeyboardEvent<HTMLInputElement>) => {
    if ($event.key === 'ArrowUp' || ($event.key === 'ArrowDown' && _inputType === 'number')) {
      $event.preventDefault();
      // @ts-ignore
      $event.target.blur();
    }

    if (otherProps.onKeyDown) {
      otherProps.onKeyDown($event);
    }
  };

  const onInput = ($event: React.FormEvent<HTMLInputElement>) => {
    if (allowOnlyNumbers) {
      const target = $event.target as HTMLInputElement;

      if (!Number(target.value)) {
        target.value = '0';
      }
    }

    if (otherProps.onInput) {
      otherProps.onInput($event);
    }
  };

  return (
    <FieldContainer {...fieldContainerProps} disabled={_disabled} id={_id} isLoading={isLoading} variant={_variant}>
      <div className={s.Input__wrapper}>
        <input
          {...otherProps}
          autoComplete="off"
          autoCorrect="off"
          className={clsx(
            s.Input,
            {
              [s.Input__withIcon]: enableTextVisibilityToggle,
              [s.Input__primary]: _variant === 'primary',
              [s.Input__secondary]: _variant === 'secondary',
              [s.Input__disabled]: _disabled
            },
            inputClassName
          )}
          disabled={_disabled}
          onWheel={onWheel}
          onKeyDown={onKeyDown}
          onInput={onInput}
          id={_id}
          ref={mergeRefs([inputRef, ref])}
          type={_inputType}
        />

        {enableTextVisibilityToggle && !isLoading && (
          <div className={clsx(s.Input__icon)} onClick={toggleTextVisibility}>
            {!isTextVisible ? <EyeLineThroughIcon /> : <EyeIcon />}
          </div>
        )}

        {icon && !isLoading && (
          <div className={clsx(s.Input__icon, enableTextVisibilityToggle && s.secondIcon)} onClick={onClickIcon}>
            {icon}
          </div>
        )}

        {children}
      </div>
    </FieldContainer>
  );
});
