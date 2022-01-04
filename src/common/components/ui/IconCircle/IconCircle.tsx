import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import clsx from 'clsx';

import s from './IconCircle.module.scss';

export enum EIconCircleSizes {
  L = 'l',
  M = 'm',
  XL = 'xl'
}

export interface IIconCircleProps {
  buttonProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className'>;
  children?: React.ReactNode;
  className?: string;
  height?: number;
  icon?: React.ReactElement;
  isStatic?: boolean;
  linkProps?: Omit<LinkProps, 'to' | 'onClick' | 'className'>;
  onClick?: (e: React.MouseEvent) => void;
  shadow?: 'm' | 'l' | 'xl';
  to?: string;
  width?: number;
}

export const IconCircle = React.forwardRef<any, IIconCircleProps>((props, ref) => {
  const {
    buttonProps,
    children,
    className,
    height = 40,
    icon,
    isStatic = false,
    linkProps,
    onClick,
    shadow,
    to,
    width = 40
  } = props;

  const classNameToUse = clsx(
    s.IconCircle,
    {
      [s.IconCircle_shadowM]: shadow === 'm',
      [s.IconCircle_shadowL]: shadow === 'l',
      [s.IconCircle_shadowXl]: shadow === 'xl'
    },
    className
  );

  const commonProps = {
    className: classNameToUse,
    ref,
    style: {
      height,
      minWidth: width,
      width
    }
  };

  if (isStatic) {
    return <div {...commonProps}>{children ?? icon}</div>;
  }

  if (to) {
    return (
      <Link onClick={onClick} to={to} {...commonProps} {...linkProps}>
        {children ?? icon}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button" {...commonProps} {...buttonProps}>
      {children ?? icon}
    </button>
  );
});
