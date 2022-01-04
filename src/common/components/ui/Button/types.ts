import React from 'react';
import { LinkProps } from 'react-router-dom';

export type ButtonVariants = 'primary' | 'secondary';
export type ButtonSizes = 's' | 'm' | 'xl';
export type ButtonColors =
  | 'green'
  | 'grey'
  | 'orange'
  | 'blue'
  | 'black'
  | 'transparent'
  | 'transparent-outlined'
  | 'white-blue'
  | 'gray'
  | 'transparent-with-circle';
export type ButtonTypes = 'submit' | 'reset' | 'button';

export enum EButtonTextColors {
  GREEN = 'green'
}
export type ButtonCommonProps = {
  children?: React.ReactNode;
  className?: string;
  color?: ButtonColors;
  disabled?: boolean;
  isLoading?: boolean;
  isTextButton?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: ButtonSizes;
  textColor?: EButtonTextColors;
  variant?: ButtonVariants;
};

export type ButtonProps = ButtonCommonProps & React.HtmlHTMLAttributes<HTMLButtonElement> & { type?: ButtonTypes };
export type ButtonLinkProps = ButtonCommonProps & Omit<LinkProps, keyof ButtonCommonProps>;
export type ButtonBaseProps = ButtonCommonProps & { isLink?: boolean } & (ButtonProps | ButtonLinkProps);
