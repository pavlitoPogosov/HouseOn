import React from 'react';

import { ButtonBase } from './ButtonBase';
import { ButtonLinkProps, ButtonProps } from './types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <ButtonBase {...props} ref={ref} />;
});

export const ButtonLink: React.FC<ButtonLinkProps> = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props, ref) => {
    return <ButtonBase {...props} ref={ref} isLink />;
  }
);
