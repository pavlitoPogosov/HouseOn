import React, { useEffect } from 'react';

import clsx from 'clsx';

import { THINSP } from '@proscom/ui-utils';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { SelectDropdown } from 'common/components/ui/Select';
import { useSelectDropdown } from 'common/hooks/useSelectDropdown';
import { trimStringLine } from 'utils/stringUtils';

import s from './SelectTextual.module.scss';

export interface ISelectTextualProps {
  containerClassName?: string;
  dropdownClassName?: string;
  isDisabled?: boolean;
  isDropDownIcon?: boolean;
  maxValueLetters?: number;
  // containerClassName?: string;
  // placeholder?: string;
  // inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  // fieldContainerProps?: Omit<FieldContainerProps, 'error' | 'label'>;
  // error?: string;
  // label?: string;
  onChange: (value: ISelectTextualOption) => void;
  options: ISelectTextualOption[];
  prefix?: string;
  prefixClassName?: string;
  selectedClassName?: string;
  selectedOption?: ISelectTextualOption;

  valueClassName?: string;
}

export interface ISelectTextualOption {
  text: string;
  value: string;
}

export const SelectTextual: React.FC<ISelectTextualProps> = props => {

  const {
    containerClassName,
    dropdownClassName,
    isDisabled = false,
    isDropDownIcon = true,
    maxValueLetters = 30,
    onChange,
    options,
    prefix,
    prefixClassName,
    selectedClassName,
    selectedOption,
    valueClassName,
  } = props;

  const {
    dropdownRef,
    dropdownToggler,
    handleKeyDown,
    handleOptionClick,
    hoveredOptionIndex,
  } = useSelectDropdown({
    onChange,
    options,
  });

  useEffect(() => {
    if (dropdownToggler.value) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ dropdownToggler.value, handleKeyDown ]);

  return (
    <div
      className={clsx(s.SelectTextual__container, containerClassName, isDisabled && s.disabled)}
      ref={dropdownRef}
    >
      <div
        className={clsx(s.SelectTextual__selected, selectedClassName)}
        onClick={dropdownToggler.set}
      >
        {
          prefix && (
            <div className={clsx(s.SelectTextual__prefix, prefixClassName)}>
              {prefix}

              {THINSP}
            </div>
          )
        }

        <div className={clsx(s.SelectTextual__value, valueClassName)}>
          {trimStringLine(selectedOption?.text, maxValueLetters)}

          {
            isDropDownIcon && (
              <span className={clsx(s.SelectTextual__icon, dropdownToggler.value && s.rotate, isDisabled && s.disabled)}>
                <ChevronDownIcon />
              </span>
            )
          }
        </div>
      </div>

      <SelectDropdown
        containerClassName={clsx(s.SelectTextual__dropdown, dropdownClassName)}
        hoveredOptionIndex={hoveredOptionIndex}
        isOpen={dropdownToggler.value}
        onClickOption={handleOptionClick}
        options={options}
        selectedOption={selectedOption}
      />
    </div>
  );
};
