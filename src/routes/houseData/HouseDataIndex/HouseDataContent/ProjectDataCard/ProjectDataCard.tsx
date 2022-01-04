import React from 'react';

import clsx from 'clsx';

import { ReactComponent as EllipsisMenuIcon } from 'assets/icons/ellipsisMenu.svg';
import { ReactComponent as TaskIcon } from 'assets/icons/task.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { ReactComponent as FileIcon } from '../_icons/file.svg';
import { ReactComponent as FolderIcon } from '../_icons/folder.svg';

import s from './ProjectDataCard.module.scss';

export type IProjectDataCard =
  | {
      title: string;
      foldersCount: number;
      filesCount: number;
      image?: string | null;
      isInbox: false;
    }
  | {
      isInbox: true;
      title: string;
      filesCount: number;
    };

export interface ProjectDataCardProps {
  card: IProjectDataCard;
  containerClassName?: string;

  onClick: () => void;
}

export const ProjectDataCard: React.FC<ProjectDataCardProps> = ({ card, containerClassName, onClick }) => {
  return (
    <article className={clsx(s.ProjectDataCard__container, containerClassName)} onClick={onClick}>
      <div
        className={clsx(
          s.ProjectDataCard__imgWrapper,
          card.isInbox && s.inbox,
          !card.isInbox && !card.image && s.placeholder
        )}>
        {card.isInbox && <TaskIcon />}

        {!card.isInbox && card.image && <img src={card.image} alt="" />}
      </div>

      <div className={s.ProjectDataCard__content}>
        <div className={s.ProjectDataCard__titleWrapper}>
          <Text variant={TextPropsVariantsEnum.BODY_M} text={card.title} className={s.ProjectDataCard__title} />

          <EllipsisMenuIcon />
        </div>

        {!card.isInbox && (
          <div className={s.ProjectDataCard__iconContainer}>
            <FolderIcon className={s.ProjectDataCard__icon} />
            <Text
              text={`${card.foldersCount} folder${card.foldersCount > 1 ? 's' : ''}`}
              color="textSecondary"
              variant={TextPropsVariantsEnum.BODY_M}
              className={s.ProjectDataCard__iconText}
            />
          </div>
        )}

        <div className={s.ProjectDataCard__iconContainer}>
          <FileIcon className={s.ProjectDataCard__icon} />
          <Text
            text={`${card.filesCount} file${card.filesCount > 1 ? 's' : ''}`}
            color="textSecondary"
            variant={TextPropsVariantsEnum.BODY_M}
            className={s.ProjectDataCard__iconText}
          />
        </div>
      </div>
    </article>
  );
};
