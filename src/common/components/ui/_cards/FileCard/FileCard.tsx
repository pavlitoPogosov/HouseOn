import React from 'react';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as EyeLineThroughIcon } from 'assets/icons/eyeLineThrough.svg';
import { ReactComponent as FileIcon } from 'assets/icons/todo.svg';
import { StatusBadge } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import {
  Text,
  TextPropsVariantsEnum, 
} from 'common/components/ui/Text/Text';
import { useToggleable } from 'common/hooks/useToggleable';
import { THouseDataFile } from 'routes/projects/types';

import s from './FileCard.module.scss';

export interface IFileCardProps {
  containerClassName?: string;
  file?: THouseDataFile;
  isRecommended?: boolean;
}

// TODO add real props
export const FileCard: React.FC<IFileCardProps> = props => {
  const {
    containerClassName,
    file,
    isRecommended,
  } = props;

  const {
    addedTime,
    coOwners,
    comment,
    expireTime,
    extension,
    id,
    img,
    issueTime,
    owner,
    tags,
    title,
  } = file || {};

  const disabledToggler = useToggle();

  const {
    onToggle,
    refCallback,
    setIsOpen,
    styles,
  } = useToggleable();

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsOpen(false);
    disabledToggler.toggle();
  };

  return (
    <article className={clsx(s.FileCard__container, containerClassName)}>
      <div className={clsx(s.FileCard__icon, disabledToggler.value && s.disabled)}>
        <FileIcon />
      </div>

      <div className={s.FileCard__content}>
        <div className={s.FileCard__content_top}>
          <div className={clsx(s.FileCard__content_text, disabledToggler.value && s.disabled)}>
            <Text
              className={s.FileCard__title}
              text={title}
              variant={TextPropsVariantsEnum.BODY_M}
            />

            {
              isRecommended && (
                <Text
                  className={s.FileCard__description}
                  color="textSecondary"
                  text="Recommended to upload"
                  variant={TextPropsVariantsEnum.CAPTION_M}
                />
              )
            }
          </div>

          <IconCircle
            className={clsx(s.FileCard__content__disabler, disabledToggler.value && s.disabled)}
            height={24}
            icon={disabledToggler.value ? <EyeLineThroughIcon /> : <EyeIcon />}
            onClick={handleIconClick}
            width={24}
          />
        </div>

        <div className={clsx(s.FileCard__tags, disabledToggler.value && s.disabled)}>
          {
            extension && (
              <Text
                className={s.FileCard__extension}
                color="textSecondary"
                text={extension}
                variant={TextPropsVariantsEnum.CAPTION_R}
              />
            )
          }

          {extension && <span className={s.FileCard__dot}>&#8226;</span>}

          {
            tags?.map(tag => (
              <StatusBadge
                containerClassName={s.FileCard__tag_filled}
                key={tag}
              >
                {tag}
              </StatusBadge>
            ))
          }
        </div>
      </div>
    </article>
  );
};
