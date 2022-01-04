import React from 'react';

import { Moment } from 'moment';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { MODAL_NAMES_ENUM } from '../ProfileSettingsPage';

import { ProfileSettingsInfoItem } from './ProfileSettingsInfoItem/ProfileSettingsInfoItem';

import s from './ProfileSettingsInfo.module.scss';

export interface ProfileSettingsInfoProps {
  email: string | undefined | null;
  phone: string | undefined | null;
  birthday: Moment | undefined | null;
  passwordUpdatedTime: string | undefined | null;
  setActiveModal: (activeModal: MODAL_NAMES_ENUM | null) => void;
}

export const ProfileSettingsInfo: React.FC<ProfileSettingsInfoProps> = ({
  email,
  phone,
  birthday,
  passwordUpdatedTime,
  setActiveModal
}) => {
  const handleModalEdit = (modalType: MODAL_NAMES_ENUM) => {
    return () => {
      setActiveModal(modalType);
    };
  };

  return (
    <div className={s.ProfileSettingsInfo__wrapper}>
      <Text text="Personal information" variant={TextPropsVariantsEnum.H3} className={s.ProfileSettingsInfo__title} />

      <ProfileSettingsInfoItem onEdit={handleModalEdit(MODAL_NAMES_ENUM.EMAIL)} label="Email" value={email || ''} />

      <ProfileSettingsInfoItem
        onEdit={handleModalEdit(MODAL_NAMES_ENUM.PHONE)}
        label="Phone number"
        value={phone || ''}
      />

      <ProfileSettingsInfoItem
        onEdit={handleModalEdit(MODAL_NAMES_ENUM.BIRTHDAY)}
        label="Date of birth"
        value={birthday ? birthday.format('DD.MM.YYYY') : ''}
      />

      {/* FIX ask backend for password update time */}
      <ProfileSettingsInfoItem
        onEdit={handleModalEdit(MODAL_NAMES_ENUM.PASSWORD)}
        label="Password"
        value={passwordUpdatedTime || ''}
      />
    </div>
  );
};
