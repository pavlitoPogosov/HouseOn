import React, { useRef } from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { useClickOutside, useToggle } from '@proscom/ui-react';
import { ReactComponent as ChevronDownSmallIcon } from 'assets/icons/chevronDownSmall.svg';
import { ReactComponent as ChevronUpIcon } from 'assets/icons/chevronUp.svg';
import { FieldContainer, FieldContainerProps } from 'common/components/ui/FieldContainer/FieldContainer';
import { getDayMinutes, prepareNewTimeInputValue } from 'utils/dates';

import s from './TimeInput.module.scss';

type OwnProps = {
  inputClassName?: string;
  maxTime?: moment.Moment;
  minTime?: moment.Moment;
  fieldContainerProps?: Omit<FieldContainerProps, 'id' | 'variant'>;

  value: moment.Moment;
  onChange: (value: moment.Moment) => void;
};

export type TimeInputProps = OwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

let idCounter = 0;

// TODO add open on focus, close on blur
// TODO should think about input status when reached max/min time
export const TimeInput: React.FC<TimeInputProps> = ({
  id,
  type,
  inputClassName,
  children,
  disabled,
  value,
  maxTime,
  minTime,
  fieldContainerProps,
  onChange,
  ...otherProps
}) => {
  const dropdownToggler = useToggle();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const _id = useRef(id || `time-field-${++idCounter}`).current;

  useClickOutside(containerRef, dropdownToggler.value ? dropdownToggler.unset : null);

  const handleChange = (newTime: moment.Moment) => {
    const newTimeMinutues = getDayMinutes(newTime)!;
    const minTimeMinutues = getDayMinutes(minTime);
    const maxTimeMinutues = getDayMinutes(maxTime);

    const isInvalidMinTime = minTimeMinutues && newTimeMinutues <= minTimeMinutues;
    const isInvalidMaxTime = maxTimeMinutues && newTimeMinutues >= maxTimeMinutues;

    if (isInvalidMinTime || isInvalidMaxTime) return;

    onChange(prepareNewTimeInputValue(value, newTime));
  };

  const handleIconClick = (type: 'inc' | 'dec') => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();

      if (type === 'inc') {
        handleChange(value.clone().add(1, 'hour'));
      }

      if (type === 'dec') {
        handleChange(value.clone().subtract(1, 'hour'));
      }
    };
  };

  const handleCellClick = (type: 'm' | 'h' | 'p', valueToSet: string) => {
    return () => {
      if (type === 'm') {
        handleChange(value.clone().set('minute', Number(valueToSet)));
      }

      if (type === 'h') {
        handleChange(value.clone().set('hour', value.get('hour') >= 12 ? Number(valueToSet) + 12 : Number(valueToSet)));
      }

      if (type === 'p') {
        handleChange(value.clone().add('hour', Number(valueToSet)));
      }
    };
  };

  return (
    <FieldContainer
      {...fieldContainerProps}
      id={_id}
      disabled={disabled}
      variant="primary"
      onLabelClick={!disabled ? dropdownToggler.set : dropdownToggler.unset}
      ref={containerRef}
    >
      <div className={s.Input__wrapper} onClick={!disabled ? dropdownToggler.set : dropdownToggler.unset}>
        <input
          {...otherProps}
          id={_id}
          type="text"
          onChange={() => {}}
          value={value.format('h:mm A')}
          className={clsx(s.TimeInput, { [s.TimeInput__disabled]: disabled }, inputClassName)}
          autoComplete="off"
          autoCorrect="off"
          disabled={disabled}
        />

        <div className={clsx(s.TimeInput__icons, disabled ? s.TimeInput__icons_disabled : '')}>
          <div onClick={handleIconClick('inc')}>
            <ChevronUpIcon width={16} height={16} viewBox="0 0 16 16" />
          </div>

          <div onClick={handleIconClick('dec')}>
            <ChevronDownSmallIcon width={16} height={16} viewBox="0 0 16 16" />
          </div>
        </div>

        {dropdownToggler.value && (
          <div className={s.TimeInput__dropdown}>
            <div className={s.TimeInput__dropdownColumn}>
              {new Array(12).fill(1).map((_, i) => {
                const isActive = value.format('h') === String(i + 1);

                return (
                  <div
                    className={clsx(s.TimeInput__cell, isActive && s.active)}
                    onClick={isActive ? undefined : handleCellClick('h', String(i + 1))}
                    key={i}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>

            <div className={s.TimeInput__dropdownColumn}>
              {new Array(60).fill(1).map((_, i) => {
                const isActive = value.get('minute') === i;

                return (
                  <div
                    className={clsx(s.TimeInput__cell, isActive && s.active)}
                    onClick={isActive ? undefined : handleCellClick('m', String(i))}
                    key={i}
                  >
                    {i < 10 ? `0${i}` : i}
                  </div>
                );
              })}
            </div>

            <div className={s.TimeInput__dropdownColumn}>
              <div
                className={clsx(s.TimeInput__cell, value.format('a') === 'am' && s.active)}
                onClick={value.format('a') === 'am' ? undefined : handleCellClick('p', '-12')}
              >
                AM
              </div>
              <div
                className={clsx(s.TimeInput__cell, value.format('a') === 'pm' && s.active)}
                onClick={value.format('a') === 'pm' ? undefined : handleCellClick('p', '+12')}
              >
                PM
              </div>
            </div>
          </div>
        )}
      </div>
    </FieldContainer>
  );
};
