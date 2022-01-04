import React from 'react';

import clsx from 'clsx';

import s from './SelectDropdown.module.scss';

export interface SelectDropdownOption {
  text: string;
  value: string;
}

export interface SelectRenderOptionProps {
  option: SelectDropdownOption;
  optionClassName?: string;
}

export interface SelectDropdownProps {
  containerClassName?: string;
  options: SelectDropdownOption[];
  isOpen: boolean;
  selectedOption?: SelectDropdownOption;
  hoveredOptionIndex?: number | null;
  optionContainerClassName?: string;
  stopPropogationOnOptionClick?: boolean;

  onClickOption?: (option: SelectDropdownOption) => void;
  renderOptionText?: (option: SelectDropdownOption, index: number) => React.ReactNode;
  renderOption?: (props: SelectRenderOptionProps) => React.ReactNode;
}

export const SelectDropdown = React.forwardRef<any, SelectDropdownProps>(
  (
    {
      containerClassName,
      options,
      isOpen,
      selectedOption,
      hoveredOptionIndex,
      stopPropogationOnOptionClick,
      optionContainerClassName,
      onClickOption,
      renderOptionText,
      renderOption
    },
    ref
  ) => {
    if (!isOpen) return null;

    const handleOptionClick = (option: SelectDropdownOption) => {
      return (e: React.MouseEvent) => {
        if (stopPropogationOnOptionClick) {
          e.stopPropagation();
        }
        onClickOption && onClickOption(option);
      };
    };

    const getOptionClassName = (option: SelectDropdownOption, optionIndex: number) =>
      clsx(
        s.SelectDropdown__option,
        {
          [s.active]: option.value === selectedOption?.value,
          [s.hover]: hoveredOptionIndex === optionIndex
        },
        optionContainerClassName
      );

    return (
      <div ref={ref} className={clsx(s.SelectDropdown__container, containerClassName)}>
        {options.map((opt, i) => {
          const optionClassName = getOptionClassName(opt, i);

          if (renderOption) {
            return <React.Fragment key={opt.value}>{renderOption({ option: opt, optionClassName })}</React.Fragment>;
          }

          return (
            <div key={opt.value} className={optionClassName} onClickCapture={handleOptionClick(opt)}>
              {renderOptionText ? renderOptionText(opt, i) : opt.text}
            </div>
          );
        })}
      </div>
    );
  }
);
