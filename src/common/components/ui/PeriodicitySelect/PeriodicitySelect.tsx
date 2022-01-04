import React from 'react';

import clsx from 'clsx';

import { Text, TextPropsVariantsEnum } from '../Text/Text';

import { IPeriodicityDropdownOption, PeriodicityDropdown } from './PeriodicityDropdown';

import s from './_styles.module.scss';

export enum PeriodicitySelectPeriodEnum {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}

const PERIOD_SELECT_OPTIONS = {
  [PeriodicitySelectPeriodEnum.DAY]: {
    text: 'Days',
    value: PeriodicitySelectPeriodEnum.DAY
  },
  [PeriodicitySelectPeriodEnum.WEEK]: {
    text: 'Weeks',
    value: PeriodicitySelectPeriodEnum.WEEK
  },
  [PeriodicitySelectPeriodEnum.MONTH]: {
    text: 'Months',
    value: PeriodicitySelectPeriodEnum.MONTH
  }
};

const AMOUNT_SELECT_OPTIONS = {
  [PeriodicitySelectPeriodEnum.DAY]: new Array(30).fill(1).map((_, i) => ({
    text: String(i + 1),
    value: i + 1
  })),
  [PeriodicitySelectPeriodEnum.WEEK]: new Array(4).fill(1).map((_, i) => ({
    text: String(i + 1),
    value: i + 1
  })),
  [PeriodicitySelectPeriodEnum.MONTH]: new Array(12).fill(1).map((_, i) => ({
    text: String(i + 1),
    value: i + 1
  }))
};

export interface PeriodicitySelectValue {
  amount: number;
  period: PeriodicitySelectPeriodEnum;
}

export interface PeriodicitySelectProps {
  containerClassName?: string;
  value: PeriodicitySelectValue;

  onChange: (value: PeriodicitySelectValue) => void;
}

export const PeriodicitySelect: React.FC<PeriodicitySelectProps> = ({ containerClassName, value, onChange }) => {
  const handleSelectChange = (wasSelectedAmount: boolean) => {
    return (selectedOption: IPeriodicityDropdownOption) => {
      onChange({
        amount: (wasSelectedAmount ? selectedOption.value : 1) as number,
        period: !wasSelectedAmount ? (selectedOption.value as PeriodicitySelectPeriodEnum) : value.period
      });
    };
  };

  return (
    <div className={clsx(s.PeriodicitySelect__container, containerClassName)}>
      <Text
        text="Every"
        className={s.PeriodicitySelect__label}
        variant={TextPropsVariantsEnum.BODY_M}
        color="textSecondary"
      />

      <PeriodicityDropdown
        options={AMOUNT_SELECT_OPTIONS[value.period]}
        selectedOption={{ value: value.amount, text: String(value.amount) }}
        onSelect={handleSelectChange(true)}
      />

      <PeriodicityDropdown
        options={Object.values(PERIOD_SELECT_OPTIONS)}
        selectedOption={PERIOD_SELECT_OPTIONS[value.period]}
        onSelect={handleSelectChange(false)}
      />
    </div>
  );
};
