import React from 'react';

import clsx from 'clsx';

import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './ProfileSettingsInfoItem.module.scss';

export interface ProfileSettingsInfoItemProps {
  label: string;
  value: string;
  onEdit: (e: React.MouseEvent) => void;
}

export const ProfileSettingsInfoItem: React.FC<ProfileSettingsInfoItemProps> = ({ label, value, onEdit }) => {
  return (
    <div className={s.ProfileSettingsInfoItem__container}>
      <Text
        text={label}
        variant={TextPropsVariantsEnum.BODY_M}
        className={s.ProfileSettingsInfoItem__label}
        color="textSecondary"
        as="div"
      />

      <Text text={value} variant={TextPropsVariantsEnum.BODY_M} className={s.ProfileSettingsInfoItem__value} as="div" />

      <Text
        onClick={onEdit}
        variant={TextPropsVariantsEnum.BODY_M}
        className={clsx(s.ProfileSettingsInfoItem__edit, value && s.ProfileSettingsInfoItem__marginLeft)}
        color="textSecondary"
        as="div">
        Edit
        <PencilIcon className={s.ProfileSettingsInfoItem__edit_icon} />
      </Text>
    </div>
  );
};
