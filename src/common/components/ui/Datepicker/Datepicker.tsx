import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { useClickOutside } from '@proscom/ui-react';

import { Calendar } from './Calendar/Calendar';
import { Controls } from './Controls/Controls';
import { PeriodSelector } from './PeriodSelector/PeriodSelector';

import s from './Datepicker.module.scss';

export interface IDatepickerValue {
  endDate: moment.Moment | null;
  isChosenMonth?: boolean;
  startDate: moment.Moment;
}

export enum EDatepickerCalendarTypes {
  MONTH = 'month',
  YEAR = 'year'
}
export interface IDatepickerProps {
  canSelectOnlyRange?: boolean;
  containerClassName?: string;
  disableRangeSelect?: boolean;
  disabledCalendars?: EDatepickerCalendarTypes[];
  disabledFromDate?: moment.Moment;
  disabledTillDate?: moment.Moment;
  isInitialMultiple?: boolean;
  isOpen: boolean;
  maxRangeInDays?: number;
  onChange: (value: IDatepickerValue) => void;

  onClose: (e: MouseEvent) => void;
  value: IDatepickerValue;
}

export const Datepicker: React.FC<IDatepickerProps> = (props) => {
  const {
    canSelectOnlyRange,
    containerClassName,
    disableRangeSelect,
    disabledCalendars,
    disabledFromDate,
    disabledTillDate,
    isInitialMultiple,
    isOpen,
    maxRangeInDays = 7,
    onChange,
    onClose,
    value
  } = props;

  const { endDate, startDate } = value || {};

  const _value: IDatepickerValue = {
    endDate: endDate || null,
    startDate: startDate
  };

  const [currentPosition, setCurrentPosition] = useState({ left: 0, top: 0 });
  const [shownDate, setShownDate] = useState(startDate);
  const [activeType, setActiveType] = useState(EDatepickerCalendarTypes.MONTH);

  const initialMultiple = disableRangeSelect ? false : !!canSelectOnlyRange || !!isInitialMultiple;

  const [isMultiple, setIsMultiple] = useState(initialMultiple);

  useEffect(() => {
    setIsMultiple(initialMultiple);
  }, [isInitialMultiple]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(containerRef, isOpen ? onClose : null);

  useEffect(() => {
    const currActiveType = disabledCalendars?.includes(EDatepickerCalendarTypes.MONTH)
      ? EDatepickerCalendarTypes.YEAR
      : EDatepickerCalendarTypes.MONTH;

    setActiveType(currActiveType);
  }, [disabledCalendars]);

  useLayoutEffect(() => {
    const changePosition = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentNode;

        if (parent) {
          const parentRects = (parent as Element).getBoundingClientRect();
          const input = parent.querySelector('input');
          let top = parentRects.height + parentRects.top + 5;
          if (top + containerRef.current.offsetHeight > window.innerHeight) {
            top = top - (top + containerRef.current.offsetHeight - window.innerHeight) - 5;
          }
          setCurrentPosition({
            left: input ? parentRects.left + input.offsetWidth - containerRef.current?.offsetWidth : parentRects.left,
            top
          });
        }
      }
    };

    const addListeners = () => {
      changePosition();
      window.addEventListener('resize', changePosition);
      document.addEventListener('scroll', changePosition);
    };

    const removeListeners = () => {
      window.removeEventListener('resize', changePosition);
      document.removeEventListener('scroll', changePosition);
    };

    if (isOpen) {
      setShownDate(_value.startDate);
      addListeners();
    } else {
      removeListeners();
    }

    return removeListeners;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={clsx(s.Datepicker__container, containerClassName)}
      ref={containerRef}
      style={{ ...currentPosition }}
    >
      <PeriodSelector
        activeType={activeType}
        disabledCalendars={disabledCalendars}
        setActiveType={setActiveType}
        setShownDate={setShownDate}
        shownDate={shownDate}
      />

      <Calendar
        activeType={activeType}
        disabledFromDate={disabledFromDate}
        disabledTillDate={disabledTillDate}
        isMultiple={isMultiple}
        maxRangeInDays={maxRangeInDays}
        onChange={onChange}
        shownDate={shownDate}
        value={_value}
      />

      {!disableRangeSelect && (
        <Controls
          activeType={activeType}
          canSelectOnlyRange={canSelectOnlyRange}
          isMultiple={isMultiple}
          onChangeMultiple={setIsMultiple}
        />
      )}
    </div>
  );
};
