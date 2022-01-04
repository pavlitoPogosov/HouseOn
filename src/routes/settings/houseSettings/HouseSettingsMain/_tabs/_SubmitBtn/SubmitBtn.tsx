import React from 'react';
import { FormattedMessage } from 'react-intl';

import clsx from 'clsx';

import { Button, ButtonSizes, ButtonTypes } from 'common/components/ui/Button';
import { useThrottledCallback } from 'use-debounce/lib';

import s from './SubmitBtn.module.scss';

export interface SubmitBtnProps {
  isLoading?: boolean;
  size?: ButtonSizes;
  type?: ButtonTypes;
  className?: string;
  onClick?: () => void;
}

export const SubmitBtn: React.FC<SubmitBtnProps> = ({ isLoading, onClick, className, size = 's', type = 'submit' }) => {
  const handleBtnClick = useThrottledCallback(
    () => {
      onClick && onClick();
    },
    3000,
    { trailing: false }
  );

  return (
    <Button
      color="orange"
      type={type}
      size={size}
      className={clsx(s.SubmitBtn, className)}
      isLoading={isLoading}
      onClick={handleBtnClick.isPending() ? undefined : handleBtnClick}>
      <FormattedMessage id="app.button.save" defaultMessage="Save" />
    </Button>
  );
};
