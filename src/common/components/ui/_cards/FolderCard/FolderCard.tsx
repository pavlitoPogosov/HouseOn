import React, { useEffect } from 'react';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import {
  ReactComponent as CloseIcon,
  ReactComponent as TimesIcon,
} from 'assets/icons/close.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as EyeLineThroughIcon } from 'assets/icons/eyeLineThrough.svg';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import {
  Text,
  TextPropsVariantsEnum,
} from 'common/components/ui/Text/Text';
import { useToggleable } from 'common/hooks/useToggleable';
import { TFileItem } from 'routes/projects/types';

import { FileCard } from '../FileCard/FileCard';

import { ReactComponent as FolderIcon } from './icons/folder.svg';

import s from './FolderCard.module.scss';

export interface IFolderCardProps {
  cardClassName?: string;
  containerClassName?: string;
  file?: TFileItem;
  isEdit?: boolean;
  onRemove?: (id: string) => void;
  onToggleVisibility?: () => void;
}

// TODO add real props
export const FolderCard: React.FC<IFolderCardProps> = (props) => {
  const { cardClassName, containerClassName, file, isEdit = false, onRemove, onToggleVisibility } = props;

  const { category, created, files, id, isDownloaded, recommended } = file || {};

  const isRecommended = Boolean(!files?.length && recommended?.length);

  const disabledToggler = useToggle();
  const { isOpen, onToggle, refCallback, setIsOpen, styles } = useToggleable();

  useEffect(() => {
    if (onToggleVisibility) {
      onToggleVisibility();
    }
  }, [isOpen]);

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsOpen(false);
    disabledToggler.toggle();
  };

  const createdStr = created ? `Created ${created.format('DD.MM.YY')}` : undefined;

  return (
    <div className={clsx(s.FolderCard__container, containerClassName)}>
      <article
        className={
          clsx(s.FolderCard__card,
            {
              [s.reccomended]: isRecommended,
              [s.downloaded]: isDownloaded,
              [s.disabled]: disabledToggler.value,
            },
            cardClassName)
        }
        onClick={!disabledToggler.value ? onToggle : undefined}
      >
        <div className={s.FolderCard__main}>
          <div className={clsx(s.FolderCard__icon, disabledToggler.value && s.disabled)}>
            <FolderIcon />
          </div>

          <div className={s.FolderCard__content}>
            <Text
              className={s.FolderCard__title}
              text={category}
              variant={TextPropsVariantsEnum.BODY_M}
            />

            <Text
              className={s.FolderCard__description}
              color={disabledToggler.value ? 'textTretiary' : 'textSecondary'}
              text={createdStr}
              variant={TextPropsVariantsEnum.CAPTION_R}
            />
          </div>
        </div>

        <div className={s.FolderCard__icons_right}>
          <IconCircle
            className={clsx(s.FolderCard__disabler, disabledToggler.value && s.disabled)}
            height={32}
            icon={disabledToggler.value ? <EyeLineThroughIcon /> : <EyeIcon />}
            onClick={handleIconClick}
            shadow="xl"
            width={32}
          />

          {
            isEdit && (
              <div
                className={s.FolderCard__btn_remove}
                onClick={
                  () => {
                    if (id) {
                      onRemove?.(id);
                    }
                  }
                }
              >
                <TimesIcon
                  height={16}
                  width={16}
                />
              </div>
            )
          }
        </div>
      </article>

      <div
        className={s.FolderCard__toggleable}
        ref={refCallback}
        style={styles}
      >
        {
          isRecommended && (
            <div className={s.FolderCard__files_wrapper}>
              <div className={s.FolderCard__filesControls}>
                <Text
                  className={s.FolderCard__filesNotification}
                  color="textSecondary"
                  text="There is no files, but we recommend you to upload some of these"
                  variant={TextPropsVariantsEnum.BODY_M}
                />

                <div
                  className={s.FolderCard__filesContainerClose}
                  onClick={onToggle}
                >
                  <CloseIcon />
                </div>
              </div>

              {
recommended!.map(f => (
  <FileCard
    containerClassName={s.FolderCard__file}
    file={f}
    isRecommended
    key={f.id}
  />
))
              }
            </div>
          )
        }

        {
          !!files?.length && (
            <div className={s.FolderCard__files_container}>
              {
                files.map(f => (
                  <FileCard
                    containerClassName={s.FolderCard__file}
                    file={f}
                    key={f.id}
                  />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
};
