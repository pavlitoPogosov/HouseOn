import React from 'react';

import clsx from 'clsx';

import s from './IconButton.module.scss';

type OwnProps = {
  icon?: React.ReactElement;
  className?: string;
  width?: number;
  height?: number;
  isSelected?: boolean;
};

export type IconButtonProps = OwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = React.forwardRef<any, IconButtonProps>(
  ({ icon, className, children, isSelected, width = 30, height = 30, type = 'button', ...otherProps }, ref) => {
    return (
      <button
        className={clsx(s.IconButton, isSelected && s.IconButton_selected, className)}
        style={{ width, height }}
        type={type}
        ref={ref}
        {...otherProps}>
        {children ?? icon}
      </button>
    );
  }
);
