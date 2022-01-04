import React, { useRef } from 'react';

import clsx from 'clsx';

import s from './RadioButton.module.scss';

type OwnProps = {
  containerClassName?: string;

  text: string;
};

export type RadioButtonProps = OwnProps & React.InputHTMLAttributes<HTMLInputElement>;

let idCounter = 0;

export const RadioButton: React.FC<RadioButtonProps> = ({ id, containerClassName, text, ...otherProps }) => {
  const _id = useRef(id || `radio-button-${idCounter++}`).current;

  return (
    <label
      htmlFor={_id}
      className={clsx(s.RadioButton__container, containerClassName, {
        [s.RadioButton__container_disabled]: otherProps.disabled
      })}>
      <input {...otherProps} className={s.RadioButton__input} type="radio" id={_id} />

      <div className={s.RadioButton__radio}>
        <div className={s.RadioButton__radioCircle} />
      </div>

      <div className={s.RadioButton__text}>{text}</div>
    </label>
  );
};
