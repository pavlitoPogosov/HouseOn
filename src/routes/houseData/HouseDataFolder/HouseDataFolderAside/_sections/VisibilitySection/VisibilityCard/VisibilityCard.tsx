import React from 'react';

import clsx from 'clsx';

import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './VisibilityCard.module.scss';

export interface VisibilityCardProps {
  containerClassName?: string;
  title: string;
  description: string;
}

export const VisibilityCard: React.FC<VisibilityCardProps> = ({ containerClassName, title, description }) => {
  return (
    <article className={clsx(s.VisibilityCard__container, containerClassName)}>
      <div className={s.VisibilityCard__iconWrapper} />

      <div className={s.VisibilityCard__content}>
        <Text variant={TextPropsVariantsEnum.BODY_M} text={title} className={s.VisibilityCard__title} />

        <Text color="textSecondary" text={description} variant={TextPropsVariantsEnum.CAPTION_M} />
      </div>

      <IconCircle shadow="l" width={32} height={32} className={s.VisibilityCard__eyeIcon} icon={<EyeIcon />} />
    </article>
  );
};
