import React, { useRef, useState } from 'react';

import { isNull } from 'lodash';

import { useClickOutside, useToggle } from '@proscom/ui-react';

export interface UseSelectDropdownProps<O> {
  options: O[];

  onChange: (item: O) => void;
  setInputValue?: (value: string | null) => void;
}

export const useSelectDropdown = <O,>({ options, setInputValue, onChange }: UseSelectDropdownProps<O>) => {
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState<null | number>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownToggler = useToggle();

  const handleClickOutside = () => {
    dropdownToggler.unset();
    setHoveredOptionIndex(null);

    setInputValue && setInputValue(null);
  };

  useClickOutside(dropdownRef, dropdownToggler.value ? handleClickOutside : null);

  const handleOptionClick = (option: O) => {
    onChange(option);
    setHoveredOptionIndex(null);
    dropdownToggler.unset();

    setInputValue && setInputValue(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dropdownToggler.set();
    setHoveredOptionIndex(null);

    setInputValue && setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && isNull(hoveredOptionIndex)) {
      e.preventDefault();

      return setHoveredOptionIndex(0);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      setHoveredOptionIndex((prev) => {
        if (prev === 0) return options.length - 1;

        return prev! - 1;
      });
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      setHoveredOptionIndex((prev) => {
        if (prev! + 1 === options.length) return 0;

        return prev! + 1;
      });
    }

    // FIX submits form from enter
    if (e.key === 'Enter' && !isNull(hoveredOptionIndex)) {
      onChange(options[hoveredOptionIndex]);
      setHoveredOptionIndex(null);
      dropdownToggler.unset();
      e.stopPropagation();

      setInputValue && setInputValue(null);
    }
  };

  return {
    dropdownToggler,
    dropdownRef,
    hoveredOptionIndex,
    handleOptionClick,
    handleInputChange,
    handleKeyDown
  };
};
