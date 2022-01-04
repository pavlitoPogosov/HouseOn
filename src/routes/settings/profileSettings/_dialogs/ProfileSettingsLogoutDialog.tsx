import React from 'react';

import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './_styles.module.scss';

export interface ProfileSettingsLogoutDialogProps {
  onClose: () => void;
  onLogout: () => void;
}

export const ProfileSettingsLogoutDialog: React.FC<ProfileSettingsLogoutDialogProps> = ({ onClose, onLogout }) => {
  return (
    <Dialog
      isOpen
      onClose={onClose}
      title="Log out"
      cancelBtnText="Cancel"
      saveBtnText="Log out"
      onClickSaveBtn={onLogout}
      onClickCancelBtn={onClose}>
      <div className={s.ProfileSettingsDialog__textCenter}>
        <Text text="Are you sure you want to log out?" variant={TextPropsVariantsEnum.BODY_L} />
      </div>
    </Dialog>
  );
};
