import React, { useEffect } from 'react';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import { EMDASH } from '@proscom/ui-utils';

import { IDatepickerValue, IDatepickerProps, Datepicker } from '../Datepicker/Datepicker';
import { Input, TInputProps } from '../Input/Input';

import { ReactComponent as CalendarIcon } from './calendar.svg';

import s from './DateInput.module.scss';

type OwnProps = {
  datepickerProps?: Omit<IDatepickerProps, 'onChange' | 'value' | 'isOpen' | 'onClose'>;
  onChange: (value: IDatepickerValue) => void;

  onOpenDatepicker?: () => void;

  value: IDatepickerValue;
  wrapperClassName?: string;
};

export type DateInputProps = OwnProps & Omit<TInputProps, 'value' | 'onChange'>;

export const DateInput: React.FC<DateInputProps> = ({
  datepickerProps,
  disabled,
  onChange,
  onOpenDatepicker,
  value,
  wrapperClassName,
  ...otherProps
}) => {
  const datepickerToggler = useToggle();

  const getInputText = () => {
    const startDate = value.startDate.format('DD.MM.YYYY');
    const isEndDate = value.endDate;
    const endDate = value.endDate?.format('DD.MM.YYYY');
    const isEquals = startDate === endDate;

    return isEndDate && !isEquals ? `${startDate} ${EMDASH} ${endDate}` : startDate;
  };

  const handleDatepickerOpen = () => {
    if (!disabled) {
      datepickerToggler.set();
    }
  };

  useEffect(() => {
    if (datepickerToggler.value && onOpenDatepicker) {
      onOpenDatepicker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datepickerToggler.value]);

  return (
    <div className={clsx(s.DateInput__wrapper, disabled && s.disabledWrapper, wrapperClassName)}>
      <Input
        {...otherProps}
        disabled={disabled}
        icon={<CalendarIcon className={s.DateInput__icon} onClick={handleDatepickerOpen} />}
        inputClassName={s.DateInput__input}
        onClick={handleDatepickerOpen}
        readOnly
        // TODO add mask
        value={getInputText()}
      />

      <Datepicker
        {...datepickerProps}
        containerClassName={s.DateInput__datepicker}
        isOpen={datepickerToggler.value}
        onChange={onChange}
        onClose={datepickerToggler.unset}
        value={value}
      />
    </div>
  );
};
