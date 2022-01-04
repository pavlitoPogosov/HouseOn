import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { ISelectPrimaryOption } from 'common/components/ui/Select';
import { SelectDropdown } from 'common/components/ui/Select/SelectDropdown/SelectDropdown';
import { useSelectDropdown } from 'common/hooks/useSelectDropdown';
import { LANGUAGE_SELECT_OPTIONS_WITH_IMGS } from 'variables/languageSelect';

import s from './SelectLanguage.module.scss';

export interface ISelectLanguageOption extends ISelectPrimaryOption {
  image?: string;
}

export interface SelectLanguageProps {
  containerClassName?: string;
  dropdownClassName?: string;
}

export const SelectLanguage: React.FC<SelectLanguageProps> = ({ containerClassName, dropdownClassName }) => {
  const [selectedOption, setSelectedOption] = useState(LANGUAGE_SELECT_OPTIONS_WITH_IMGS[0]);
  const options = LANGUAGE_SELECT_OPTIONS_WITH_IMGS;

  const { dropdownRef, dropdownToggler, hoveredOptionIndex, handleOptionClick, handleKeyDown } = useSelectDropdown({
    options,
    onChange: setSelectedOption
  });

  const renderOptionText = (option: ISelectLanguageOption, index: number) => (
    <div className={clsx(s.SelectLanguage__dropdownOption, index === hoveredOptionIndex && s.active)}>
      <div className={s.SelectLanguage__text}>{option.text}</div>

      <div className={s.SelectLanguage__imgContainer}>
        <img src={option.image} alt="" />
      </div>
    </div>
  );

  useEffect(() => {
    if (dropdownToggler.value) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownToggler.value, handleKeyDown]);

  return (
    <div
      className={clsx(s.SelectLanguage__container, containerClassName)}
      tabIndex={1}
      onClick={dropdownToggler.value ? dropdownToggler.unset : dropdownToggler.set}>
      <div className={s.SelectLanguage__text}>{selectedOption.text}</div>
      <div className={s.SelectLanguage__imgContainer}>
        <img src={selectedOption.image} alt="" />
      </div>
      <ChevronDownIcon className={clsx(s.SelectLanguage__chevronDown, dropdownToggler.value && s.rotate)} />

      <SelectDropdown
        options={options}
        selectedOption={selectedOption}
        hoveredOptionIndex={hoveredOptionIndex}
        containerClassName={clsx(s.SelectLanguage__dropdown, dropdownClassName)}
        optionContainerClassName={s.SelectLanguage__dropdownOptionContainer}
        onClickOption={handleOptionClick}
        renderOptionText={renderOptionText}
        ref={dropdownRef}
        isOpen={dropdownToggler.value}
      />
    </div>
  );
};
