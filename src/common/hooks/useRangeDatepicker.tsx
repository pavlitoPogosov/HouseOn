import { useState } from 'react';

import { IDatepickerValue } from 'common/components/ui/Datepicker/Datepicker';

interface UseDatepickerOnlyRangeReturn {
  appliedValue: IDatepickerValue;
  onChangeValue: (value: IDatepickerValue) => void;

  onClosePicker: (callback: Function) => () => void;
  setAppliedValue: React.Dispatch<React.SetStateAction<IDatepickerValue>>;
  shownValue: IDatepickerValue;
}

export const useRangeDatepicker = (initialValue: IDatepickerValue): UseDatepickerOnlyRangeReturn => {
  const [appliedValue, setAppliedValue] = useState(initialValue);
  const [shownValue, setShownValue] = useState(initialValue);

  const onChangeValue = (value: IDatepickerValue) => {
    setShownValue(value);

    if (value.startDate && value.endDate) {
      setAppliedValue(value);
    }
  };

  const onClosePicker = (callback: Function) => {
    return () => {
      setShownValue(appliedValue);
      callback();
    };
  };

  return {
    appliedValue,
    onChangeValue,
    onClosePicker,
    setAppliedValue,
    shownValue
  };
};
