import React from 'react';
import { LinkProps } from 'react-router-dom';

import clsx from 'clsx';

import s from './NavigationLink.module.scss';

export type TNavigationLinkProps<T extends React.ElementType> = {
  as?: T | LinkProps;
  children?: React.ReactNode;
  className?: string;
  icon?: JSX.Element;
  iconClassName?: string;
  isIconRight?: boolean;
  isUnderline?: boolean;
  text?: string;
};

export const NavigationLink = <T extends React.ElementType = 'a'>(
  props: TNavigationLinkProps<T> & React.ComponentPropsWithRef<T>
) => {
  const {
    as,
    children,
    className,
    icon,
    iconClassName,
    iconLeft,
    isIconRight = false,
    isUnderline = false,
    text,
    ...rest
  } = props;

  const CustomTag = as || 'a';

  return (
    <CustomTag
      className={clsx(className, s.NavigationLink, iconClassName, {
        [s.NavigationLink__iconLeft]: !isIconRight,
        [s.NavigationLink__iconRight]: isIconRight,
        [s.NavigationLink__underlined]: isUnderline
      })}
      {...rest}>
      <span className={s.NavigationLink__icon}>{icon || ''}</span>

      <span className={s.NavigationLink__text}>{children || text}</span>
    </CustomTag>
  );
};
