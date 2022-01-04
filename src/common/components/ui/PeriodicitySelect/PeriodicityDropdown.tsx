import React, { useRef } from 'react';

import clsx from 'clsx';

import { useClickOutside, useToggle } from '@proscom/ui-react';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';

import s from './_styles.module.scss';

export interface IPeriodicityDropdownOption {
  text: string;
  value: string | number;
}

export interface PeriodicityDropdownProps {
  options: IPeriodicityDropdownOption[];
  selectedOption: IPeriodicityDropdownOption;
  onSelect: (selectedOption: IPeriodicityDropdownOption) => void;
}

export const PeriodicityDropdown: React.FC<PeriodicityDropdownProps> = ({ options, selectedOption, onSelect }) => {
  const dropdownToggler = useToggle();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(containerRef, dropdownToggler.value ? dropdownToggler.unset : null);

  const handleOptionClick = (option: IPeriodicityDropdownOption) => {
    return (e: React.MouseEvent) => {
      dropdownToggler.unset();
      onSelect(option);

      e.stopPropagation();
    };
  };

  return (
    <div className={s.PeriodicityDropdown__container} onClick={dropdownToggler.toggle} ref={containerRef}>
      {selectedOption.text}

      <ChevronDownIcon
        width={20}
        height={20}
        className={clsx(s.PeriodicityDropdown__chevronIcon, dropdownToggler.value && s.rotate)}
      />

      {dropdownToggler.value && (
        <div className={s.PeriodicityDropdown__dropdown}>
          {options.map((opt) => {
            if (String(opt.value) === String(selectedOption.value)) return null;

            return (
              <div key={opt.value} className={s.PeriodicityDropdown__dropdownOption} onClick={handleOptionClick(opt)}>
                {opt.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
