import React from 'react';

import clsx from 'clsx';

import { ReactComponent as EllipsisMenuIcon } from 'assets/icons/ellipsisMenu.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { ReactComponent as FolderIcon } from './folder.svg';

import s from './FolderCard.module.scss';

export interface FolderCardProps {
  containerClassName?: string;
  shouldAdapt?: boolean;
  isActive: boolean;

  onClick: (e: React.MouseEvent) => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({ containerClassName, shouldAdapt, isActive, onClick }) => {
  return (
    <article className={clsx(s.FolderCard__container, isActive && s.active, containerClassName)} onClick={onClick}>
      {!shouldAdapt && (
        <div className={s.FolderCard__icon}>
          <FolderIcon />
        </div>
      )}

      <div className={s.FolderCard__content}>
        <Text
          variant={TextPropsVariantsEnum.BODY_L}
          text="Server hardware design documentation - Closet"
          className={clsx(s.FolderCard__title, shouldAdapt && s.mobile)}
        />

        <div className={clsx(s.FolderCard__containInfo, shouldAdapt && s.mobile)}>
          <IconCircle icon={<EyeIcon />} width={32} height={32} shadow="l" className={s.FolderCard__eyeIcon} />

          <Text variant={TextPropsVariantsEnum.CAPTION_M} color="textSecondary">
            3 projects
            <span>&thinsp; &#8226; &thinsp;</span>1 task
          </Text>
        </div>

        <EllipsisMenuIcon className={s.FolderCard__menuIcon} />

        <div className={clsx(s.FolderCard__tagsWrapper, shouldAdapt && s.mobile)}>
          <div className={s.FolderCard__tag}>Bills</div>

          <div className={s.FolderCard__tag}>Clothing</div>
        </div>
      </div>
    </article>
  );
};
