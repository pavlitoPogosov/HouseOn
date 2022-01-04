import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import clsx from 'clsx';

import { Spinner } from 'common/components/ui/Spinner/Spinner';

import { ButtonBaseProps, EButtonTextColors } from './types';

import s from './Button.module.scss';

export const ButtonBase = React.forwardRef<any, ButtonBaseProps>((props, ref) => {
  const {
    children,
    className,
    color = 'green',
    disabled,
    isLink,
    isLoading,
    isTextButton,
    leftIcon,
    rightIcon,
    size = 'm',
    textColor,
    variant = 'primary',
    ...otherProps
  } = props;

  const _disabled = disabled || isLoading;

  const commonClassName = clsx(
    s.Button,
    {
      [s.Button__green]: color === 'green',
      [s.Button__grey]: color === 'grey',
      [s.Button__orange]: color === 'orange',
      [s.Button__blue]: color === 'blue',
      [s.Button__black]: color === 'black',
      [s.Button__transparentOutlined]: color === 'transparent-outlined',
      [s.Button__transparent_with_circle]: color === 'transparent-with-circle',
      [s.Button__whiteBlue]: color === 'white-blue',
      [s.Button__gray]: color === 'gray',
      [s.Button__primary]: variant === 'primary',
      [s.Button__secondary]: variant === 'secondary',
      [s.Button__s]: size === 's',
      [s.Button__m]: size === 'm',
      [s.Button__xl]: size === 'xl',
      [s.Button__withLeftIcon]: !!leftIcon,
      [s.Button__withRightIcon]: !!rightIcon,
      [s.Button__disabled]: _disabled,
      [s.Button__text_only]: isTextButton,
      [s.Button__text_green]: textColor === EButtonTextColors.GREEN
    },
    className
  );

  const content = (
    <>
      {leftIcon && <span className={s.Button__leftIcon}>{leftIcon}</span>}

      {isLoading && (
        <span className={s.Button__spinner}>
          <Spinner size="xs" />
        </span>
      )}

      {children}

      {rightIcon && <span className={s.Button__rightIcon}>{rightIcon}</span>}
    </>
  );

  if (isLink) {
    return (
      <Link className={commonClassName} {...(otherProps as LinkProps)} ref={ref}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={commonClassName}
      disabled={_disabled}
      {...(otherProps as React.HtmlHTMLAttributes<HTMLButtonElement>)}
      ref={ref}>
      {content}
    </button>
  );
});
