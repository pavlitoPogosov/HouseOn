import React from 'react';

import clsx from 'clsx';

import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './TeamMemberShortenedCard.module.scss';

export interface TeamMemberShortenedCardProps {
  avatar?: string | null;
  role?: string | null;
  containerClassName?: string;
  onClickEdit: () => void;
}

export const TeamMemberShortenedCard: React.FC<TeamMemberShortenedCardProps> = ({
  avatar,
  role,
  containerClassName,
  onClickEdit
}) => {
  return (
    <div className={clsx(s.TeamMemberShortenedCard__card, containerClassName)}>
      <Avatar avatar={avatar} width={40} height={40} containerClassName={s.TeamMemberShortenedCard__cardAvatar} />

      <Text
        text={role || 'Gardener'}
        variant={TextPropsVariantsEnum.BODY_M}
        className={s.TeamMemberShortenedCard__cardText}
      />

      <IconCircle
        width={32}
        height={32}
        shadow="m"
        className={s.TeamMemberShortenedCard__cardIcon}
        icon={<PencilIcon />}
        onClick={onClickEdit}
      />
    </div>
  );
};
