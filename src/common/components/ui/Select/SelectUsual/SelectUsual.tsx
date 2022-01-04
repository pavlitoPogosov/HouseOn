import React, { useMemo, useState } from 'react';

import clsx from 'clsx';
import { isNull } from 'lodash';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { FieldContainer, FieldContainerProps } from 'common/components/ui/FieldContainer/FieldContainer';
import { SelectDropdown } from 'common/components/ui/Select/SelectDropdown/SelectDropdown';
import { useSelectDropdown } from 'common/hooks/useSelectDropdown';
import { normalizeString } from 'utils/stringUtils';

import s from './SelectUsual.module.scss';

export interface SelectUsualProps {
  selectedOption?: ISelectPrimaryOption;
  options: ISelectPrimaryOption[];
  containerClassName?: string;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  fieldContainerProps?: Omit<FieldContainerProps, 'error' | 'label'>;
  error?: string;
  label?: string;
  dropdownClassName?: string;
  optionContainerClassName?: string;
  disabled?: boolean;

  onChange: (value: ISelectPrimaryOption) => void;
}

export interface ISelectPrimaryOption {
  text: string;
  value: string;
}

// TODO scroll dropdown on arrow up/down
// TODO maybe add ability to remove selected value
export const SelectUsual: React.FC<SelectUsualProps> = ({
  selectedOption,
  options,
  containerClassName,
  inputProps,
  placeholder = 'Type or choose from the list',
  onChange,
  children,
  dropdownClassName,
  error,
  label,
  disabled,
  optionContainerClassName,
  fieldContainerProps
}) => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  const { dropdownRef, dropdownToggler, hoveredOptionIndex, handleInputChange, handleKeyDown, handleOptionClick } =
    useSelectDropdown({
      onChange,
      setInputValue,
      options
    });

  const currentOptions = useMemo(() => {
    if (isNull(inputValue)) {
      return options;
    }

    return options.filter((opt) => normalizeString(opt.text).includes(normalizeString(inputValue)));
  }, [inputValue, options]);

  const renderOptionText = (option: ISelectPrimaryOption) => {
    if (inputValue) {
      const regexp = new RegExp(normalizeString(inputValue || ''), 'gi');
      const [textBeforeSelection, textInSelection, textAfterSelection] = normalizeString(option.text)
        .replace(regexp, (match) => `|${match}|`)
        .split('|');

      if (textInSelection && textInSelection !== option.text) {
        const tmpStr = option.text.split('');

        const startText = tmpStr.splice(0, textBeforeSelection.length);
        const midText = tmpStr.splice(0, textInSelection.length);
        const endText = tmpStr.splice(0, textAfterSelection.length);

        return (
          <>
            {startText}
            <span className={s.SelectUsual__highlightedText}>{midText}</span>
            {endText}
          </>
        );
      }
    }

    return option.text;
  };

  return (
    <FieldContainer
      {...fieldContainerProps}
      error={error}
      label={label}
      variant={fieldContainerProps?.variant || 'primary'}
      onLabelClick={dropdownToggler.set}
      disabled={disabled}
      ref={dropdownRef}>
      <div className={clsx(s.SelectUsual__container, disabled && s.SelectUsual__disabled, containerClassName)}>
        <input
          {...inputProps}
          className={clsx(s.SelectUsual__input, placeholder && !selectedOption?.value && s.placeholder)}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onClick={!disabled ? dropdownToggler.set : undefined}
          value={isNull(inputValue) ? selectedOption?.text || '' : inputValue}
          placeholder={placeholder}
        />

        <div className={clsx(s.SelectUsual__icon, dropdownToggler.value && s.rotate)}>
          <ChevronDownIcon />
        </div>

        <SelectDropdown
          options={currentOptions}
          selectedOption={selectedOption}
          hoveredOptionIndex={hoveredOptionIndex}
          containerClassName={clsx(s.SelectUsual__dropdown, dropdownClassName)}
          isOpen={dropdownToggler.value}
          onClickOption={handleOptionClick}
          renderOptionText={renderOptionText}
          optionContainerClassName={optionContainerClassName}
        />
      </div>

      {children}
    </FieldContainer>
  );
};
