import React from 'react';

import clsx from 'clsx';

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as ChevronIcon } from 'assets/icons/chevronRight.svg';
import { getRightValuesOnSwap, setDefaultInputText } from 'utils/dates';

import { Datepicker, IDatepickerValue, IDatepickerProps } from '../Datepicker/Datepicker';

import s from './DatepickerInput.module.scss';

type OwnProps = {
  containerClassName?: string;
  enableSwap?: boolean;

  onOpen?: () => void;
  setInputText?: (value: IDatepickerValue) => string;
};

export type DatepickerInputProps = OwnProps & IDatepickerProps;

export const DatepickerInput: React.FC<DatepickerInputProps> = ({
  containerClassName,
  enableSwap,
  isOpen,
  onChange,
  onClose,
  onOpen,
  setInputText,
  value,
  ...otherProps
}) => {
  const handleSwap = (isPrev: boolean) => {
    return (e: React.MouseEvent) => {
      if (isOpen) {
        return;
      }

      e.stopPropagation();
      onChange(getRightValuesOnSwap(value, isPrev));
    };
  };

  return (
    <div
      className={clsx(
        s.DatepickerInput__container,
        !isOpen && s.notOpen,
        !enableSwap && s.noArrows,
        containerClassName
      )}
      onClick={onOpen}
    >
      {enableSwap && (
        <div className={s.DatepickerInput__leftIcon} onClick={handleSwap(true)}>
          <ChevronIcon />
        </div>
      )}

      <div className={s.DatepickerInput__text}>
        <CalendarIcon className={s.DatepickerInput__icon} />

        {setInputText ? setInputText(value) : setDefaultInputText(value)}
      </div>

      <Datepicker
        containerClassName={s.DatepickerInput__datepicker}
        isOpen={isOpen}
        onChange={onChange}
        onClose={onClose}
        value={value}
        {...otherProps}
      />

      {enableSwap && (
        <div className={s.DatepickerInput__rightIcon} onClick={handleSwap(false)}>
          <ChevronIcon />
        </div>
      )}
    </div>
  );
};
