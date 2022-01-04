import React, { useRef } from 'react';

import clsx from 'clsx';

import { useClickOutside, useToggle } from '@proscom/ui-react';
import { ReactComponent as ChevronDown } from 'assets/icons/chevronDown.svg';

import { Avatar } from '../Avatar/Avatar';

import s from './SortByPopup.module.scss';

export interface SortByPopupOption {
  value: string;
  text: string;
  iconLeft?: JSX.Element;
  image?: string;
  topDivider?: boolean;
  bottomDivider?: boolean;
}

export interface SortByPopupProps {
  size?: 'sm' | 'md';
  containerClassName?: string;
  dropdownClassName?: string;
  selectedTextPrefix?: string;
  options: SortByPopupOption[];
  selectedOption: SortByPopupOption;

  onChange?: (option: SortByPopupOption) => void;
}

export const SortByPopup: React.FC<SortByPopupProps> = ({
  containerClassName,
  dropdownClassName,
  options,
  selectedOption,
  selectedTextPrefix,
  size = 'md',
  onChange
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownToggler = useToggle();

  const handleOptionSelect = (option: SortByPopupOption) => {
    return () => {
      if (option.value !== selectedOption.value && onChange) {
        onChange(option);
      }

      dropdownToggler.unset();
    };
  };

  const handleContainerClick = () => {
    if (!dropdownToggler.value) {
      dropdownToggler.set();
    }
  };

  useClickOutside(dropdownRef, dropdownToggler.value ? dropdownToggler.unset : null);

  return (
    <div
      className={clsx(
        s.SortByPopup__container,
        {
          [s.sm]: size === 'sm',
          [s.md]: size === 'md'
        },
        containerClassName
      )}
      onClick={handleContainerClick}
    >
      <div className={s.SortByPopup__selected}>
        {typeof selectedOption.image !== 'undefined' && (
          <Avatar
            emptyClassName={s.SortByPopup__emptyImage}
            containerClassName={s.SortByPopup__image}
            avatar={selectedOption.image}
          />
        )}

        <span className={s.SortByPopup__text}>{`${selectedTextPrefix ? selectedTextPrefix + ' ' : ''} ${
          selectedOption.text
        }`}</span>

        {options.length > 1 && (
          <span>
            <ChevronDown
              className={clsx(s.SortByPopup__chevronIcon, dropdownToggler.value && s.rotate)}
              width={18}
              height={18}
            />
          </span>
        )}
      </div>

      {dropdownToggler.value && (
        <div ref={dropdownRef} className={clsx(s.SortByPopup__dropdown, dropdownClassName)}>
          {options.map((opt) => (
            <React.Fragment key={opt.value}>
              {opt.topDivider && <div className={s.SortByPopup__divider} />}

              <div className={s.SortByPopup__dropdownOption} onClick={handleOptionSelect(opt)}>
                {opt.iconLeft && <span className={s.SortByPopup__dropdownIcon}>{opt.iconLeft}</span>}

                {typeof opt.image !== 'undefined' && (
                  <Avatar
                    containerClassName={clsx(s.SortByPopup__image, s.SortByPopup__dropdownIcon)}
                    avatar={opt.image}
                  />
                )}

                <span className={s.SortByPopup__dropdownOptionText}>{opt.text}</span>
              </div>

              {opt.bottomDivider && <div className={s.SortByPopup__divider} />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
