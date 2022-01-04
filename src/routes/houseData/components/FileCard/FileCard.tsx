import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
import Tippy from '@tippyjs/react/headless';
import { ReactComponent as EllipsisMenuIcon } from 'assets/icons/ellipsisMenu.svg';
import { SelectDropdown, ISelectPrimaryOption } from 'common/components/ui/Select';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { ReactComponent as FileIcon } from './file.svg';

import s from './FileCard.module.scss';

export interface FileCardProps {
  containerClassName?: string;
  title: string;
  fileExtension: string;
  createTime: string;

  onMoveFile?: () => void;
  onDeleteFile?: () => void;
}

enum PopupValues {
  MOVE = 'move',
  DELETE = 'delete'
}
const POPUP_OPTIONS: ISelectPrimaryOption[] = [
  { text: 'Move', value: PopupValues.MOVE },
  { text: 'Delete', value: PopupValues.DELETE }
];

export const FileCard: React.FC<FileCardProps> = ({
  containerClassName,
  title,
  fileExtension,
  createTime,
  onMoveFile,
  onDeleteFile
}) => {
  const popupToggler = useToggle();

  const handleOptionClick = (option: ISelectPrimaryOption) => {
    if (option.value === PopupValues.MOVE) {
      onMoveFile && onMoveFile();
    }

    if (option.value === PopupValues.DELETE) {
      onDeleteFile && onDeleteFile();
    }

    popupToggler.unset();
  };

  const renderPopup = () => (
    <SelectDropdown
      options={POPUP_OPTIONS}
      onClickOption={handleOptionClick}
      containerClassName={s.FileCard__popup}
      isOpen
    />
  );

  return (
    <article className={clsx(s.FileCard__container, containerClassName)}>
      <div className={s.FileCard__img} />

      <div className={s.FileCard__content}>
        <div className={s.FileCard__header}>
          <Text className={s.FileCard__title} variant={TextPropsVariantsEnum.BODY_M} text={title} />

          {onDeleteFile && onMoveFile && (
            <Tippy
              render={renderPopup}
              visible={popupToggler.value}
              onClickOutside={popupToggler.unset}
              offset={[-160, -32]}
              interactive>
              <EllipsisMenuIcon className={s.FileCard__menuIcon} onClick={popupToggler.set} />
            </Tippy>
          )}
        </div>

        <Text
          variant={TextPropsVariantsEnum.CAPTION_M}
          color="textSecondary"
          className={s.FileCard__time}
          text={`Created ${moment(createTime).format('DD.MM.YY')}`}
        />

        <div className={s.FileCard__footer}>
          <FileIcon />

          <div className={s.FileCard__fileName}>{fileExtension}</div>
        </div>
      </div>
    </article>
  );
};
