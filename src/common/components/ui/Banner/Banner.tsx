import React from 'react';

import clsx from 'clsx';

import { ReactComponent as CloseIcon } from 'assets/icons/closeSolid.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './Banner.module.scss';

export interface BannerProps {
  title?: React.ReactNode;
  titleVariant?: TextPropsVariantsEnum;
  titleClassName?: string;
  description?: React.ReactNode;
  descriptionClassName?: string;
  variant?: 'primary' | 'secondary';
  containerClassName?: string;

  onClose?: () => void;
}

export const Banner: React.FC<BannerProps> = ({
  title,
  titleVariant,
  titleClassName,
  description,
  descriptionClassName,
  children,
  containerClassName,
  variant = 'primary',
  onClose
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  return (
    <div
      className={clsx(
        s.Banner__container,
        {
          [s.primary]: isPrimary,
          [s.secondary]: isSecondary
        },
        containerClassName
      )}>
      {onClose && (
        <div onClick={onClose} className={s.Banner__closeIcon}>
          <CloseIcon width={10} height={10} viewBox="0 0 16 16" />
        </div>
      )}

      <Text
        className={clsx(s.Banner__title, titleClassName)}
        variant={titleVariant || TextPropsVariantsEnum.H3}
        as="h4"
        color={isPrimary ? 'white' : undefined}>
        {title}
      </Text>

      <Text
        variant={TextPropsVariantsEnum.CAPTION_M}
        color={isPrimary ? 'white' : 'textTretiary'}
        className={clsx(descriptionClassName)}>
        {description}
      </Text>

      {children}
    </div>
  );
};
