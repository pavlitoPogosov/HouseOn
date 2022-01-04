import React, { useRef } from 'react';

import clsx from 'clsx';

import { ReactComponent as CheckIcon } from './icons/check.svg';

import s from './Checkbox.module.scss';

type OwnProps = {
  id?: string;
  containerClassName?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  textClassName?: string;
  text?: string;
};

export type CheckboxProps = OwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'>;

let idCounter = 0;

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  containerClassName,
  children,
  textClassName,
  className,
  text,
  checkboxClassName,
  checked,
  value,
  disabled,
  ...otherProps
}) => {
  const _id = useRef(id || `checkbox-field-${++idCounter}`).current;

  return (
    <label
      htmlFor={_id}
      className={clsx(
        s.Checkbox__container,
        {
          [s.checked]: value || checked,
          [s.notChecked]: !value || !checked,
          [s.disabled]: disabled
        },
        containerClassName
      )}>
      <input
        type="checkbox"
        id={_id}
        className={clsx(s.Checkbox__input, className)}
        {...otherProps}
        checked={checked}
        value={value}
        disabled={disabled}
      />

      <div className={clsx(s.Checkbox, checkboxClassName)}>
        <CheckIcon className={s.Checkbox__icon} />
      </div>

      <div className={clsx(s.Checkbox__text, textClassName)}>{children ?? text}</div>
    </label>
  );
};
