import React from 'react';

import clsx from 'clsx';

import { ReactComponent as ChatIcon } from 'assets/icons/comment.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './AccountCard.module.scss';

export interface AccountCardProps {
  containerClassName?: string;
  name: string;

  onEdit?: () => void;
  onCopy?: () => void;
  onChat?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ containerClassName, name, onEdit, onCopy, onChat }) => {
  return (
    <div className={clsx(s.AccountCard__container, containerClassName)}>
      <div className={s.AccountCard__avatarWrapper}>
        <Avatar containerClassName={s.AccountCard__avatar} width={40} height={40} />

        <Text text={name} variant={TextPropsVariantsEnum.BODY_M} className={s.AccountCard__name} />
      </div>

      <div className={s.AccountCard__iconsWrapper}>
        {onEdit && (
          <IconCircle
            width={32}
            height={32}
            onClick={onEdit}
            className={clsx(s.AccountCard__icon, s.pencilIcon)}
            icon={<PencilIcon />}
          />
        )}

        {onCopy && (
          <IconCircle width={32} height={32} onClick={onCopy} className={s.AccountCard__icon} icon={<CopyIcon />} />
        )}

        {onChat && (
          <IconCircle width={32} height={32} onClick={onChat} className={s.AccountCard__icon} icon={<ChatIcon />} />
        )}
      </div>
    </div>
  );
};
