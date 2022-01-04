import React from 'react';

import clsx from 'clsx';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import s from './SearchInput.module.scss';

type OwnProps = {
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
};

export type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & OwnProps;

// TODO add custom search logic for searchInput, such as onDebounceChange and etc

export const SearchInput: React.FC<SearchInputProps> = ({
  containerClassName,
  inputClassName,
  iconClassName,
  placeholder = 'Search',
  ...otherProps
}) => {
  return (
    <div className={clsx(s.SearchInput__container, containerClassName)}>
      <div className={s.SearchInput__inputWrapper}>
        <div className={clsx(s.SearchInput__icon, iconClassName)}>
          <SearchIcon />
        </div>

        <input
          className={clsx(s.SearchInput__input, inputClassName)}
          type="text"
          placeholder={placeholder}
          {...otherProps}
        />
      </div>
    </div>
  );
};
