import React from 'react';

import clsx from 'clsx';

import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { ReactComponent as PhotoIcon } from 'assets/icons/photo.svg';
import { IAvatarProps } from 'common/components/ui/Avatar/Avatar';
import s from 'common/components/ui/AvatarEditable/AvatarEditable.module.scss';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';

export interface IAvatarEditableProps extends IAvatarProps {
  isEditIcon?: boolean;
  onEdit?: (newAvatar: string) => void;
  withPhotoPlaceholder?: boolean;
}

export const AvatarEditable = React.forwardRef<HTMLDivElement, IAvatarEditableProps>((props, ref) => {
  const {
    avatar,
    containerClassName,
    emptyClassName,
    emptyText,
    height = 32,
    imgClassName,
    isEditIcon = true,
    onEdit,
    width = 32,
    withPhotoPlaceholder = false
  } = props;

  const handleAvatarEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onEdit) {
      const file = e.target.files?.length ? e.target.files[0] : '';
      onEdit(URL.createObjectURL(file as Blob | MediaSource));
    }
  };

  const avatarPlaceholder = withPhotoPlaceholder ? (
    <IconCircle className={s.Avatar__placeholder} height={32} icon={<PhotoIcon />} shadow="m" width={32} />
  ) : (
    <div className={clsx(s.Avatar__empty, emptyClassName)}>{emptyText?.charAt(0)}</div>
  );

  return (
    <>
      <label htmlFor="avatar-edit-input">
        <div className={clsx(s.Avatar__wrapper, s.edit, containerClassName)} ref={ref} style={{ height, width }}>
          {!avatar ? avatarPlaceholder : <img alt="" className={clsx(s.Avatar__image, imgClassName)} src={avatar} />}

          {isEditIcon && (
            <label className={s.Avatar__editWrapper}>
              <div className={s.Avatar__editIcon}>
                <PencilIcon height={18} width={18} />
              </div>
            </label>
          )}
        </div>
      </label>

      <input
        accept="image/*"
        className={s.Avatar__editInput}
        id="avatar-edit-input"
        onChange={handleAvatarEdit}
        type="file"
      />
    </>
  );
});
