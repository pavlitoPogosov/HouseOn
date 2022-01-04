import React from 'react';

import clsx from 'clsx';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './MemberCard.module.scss';

export interface MemberCardProps {
  containerClassName?: string;
  isActive?: boolean;
  avatar?: string;
  name: string;

  onDelete?: () => void;
  onClick?: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  containerClassName,
  isActive,
  avatar,
  name,
  onDelete,
  onClick
}) => {
  return (
    <article onClick={onClick} className={clsx(s.MemberCard__container, isActive && s.active, containerClassName)}>
      <div className={s.MemberCard__content}>
        <Avatar avatar={avatar} width={40} height={40} containerClassName={s.MemberCard__avatar} />

        <Text className={s.MemberCard__title} variant={TextPropsVariantsEnum.BODY_M} text={name} />
      </div>

      {onDelete && <IconCircle width={32} height={32} shadow="xl" icon={<CloseIcon />} onClick={onDelete} />}
    </article>
  );
};
