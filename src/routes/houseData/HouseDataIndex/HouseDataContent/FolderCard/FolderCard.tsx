import React from 'react';
import { useHistory } from 'react-router';

import clsx from 'clsx';

import { ReactComponent as EllipsisMenuIcon } from 'assets/icons/ellipsisMenu.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { HOUSE_DATA_FOLDER_PAGE_ROUTE } from 'utils/routes';

import { ReactComponent as FileIcon } from '../_icons/file.svg';
import { ReactComponent as FolderIcon } from '../_icons/folder.svg';

import s from './FolderCard.module.scss';

export interface IFolderCard {
  title: string;
  filesCount: number;
}

export interface FolderCardProps {
  card: IFolderCard;
  containerClassName?: string;
}

export const FolderCard: React.FC<FolderCardProps> = ({ card, containerClassName }) => {
  const history = useHistory();

  const handleCardClick = () => {
    history.push(HOUSE_DATA_FOLDER_PAGE_ROUTE.replace(':id(\\d+)', '1'));
  };

  return (
    <article className={clsx(s.FolderCard__container, containerClassName)} onClick={handleCardClick}>
      <div className={s.FolderCard__iconContainer}>
        <FolderIcon />
      </div>

      <div className={s.FolderCard__content}>
        <Text variant={TextPropsVariantsEnum.BODY_L} text={card.title} className={s.FolderCard__title} />

        <div className={s.FolderCard__filesCount}>
          <FileIcon />

          <Text
            text={`${card.filesCount} file${card.filesCount > 1 ? 's' : ''}`}
            variant={TextPropsVariantsEnum.BODY_M}
            color="textSecondary"
          />
        </div>
      </div>

      <EllipsisMenuIcon />
    </article>
  );
};
