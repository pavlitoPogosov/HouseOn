import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'common/components/ui/Button/Button';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { logoutAC } from 'redux/slices/authSlice/actionCreators';
import toastActions from 'redux/slices/toastSlice';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { CenteredPageLayout } from 'routes/_layouts/CenteredPageLayout/CenteredPageLayout';
import { SUPPORT_PAGE_ROUTE } from 'utils/routes';

import { ProfileSettingsBirthDialog } from './_dialogs/ProfileSettingsBirthDialog';
import { ProfileSettingsEmailDialog } from './_dialogs/ProfileSettingsEmailDialog';
import { ProfileSettingsLogoutDialog } from './_dialogs/ProfileSettingsLogoutDialog';
import { ProfileSettingsPasswordDialog } from './_dialogs/ProfileSettingsPasswordDialog';
import { ProfileSettingsPhoneDialog } from './_dialogs/ProfileSettingsPhoneDialog';
import { ReactComponent as ExitIcon } from './icons/exit.svg';
import { ProfileSettingsContent } from './ProfileSettingsContent/ProfileSettingsContent';
import { ProfileSettingsHeader } from './ProfileSettingsHeader/ProfileSettingsHeader';
import { ProfileSettingsInfo } from './ProfileSettingsInfo/ProfileSettingsInfo';

import s from './ProfileSettingsPage.module.scss';

export interface ProfileSettingsPageProps {}
export enum MODAL_NAMES_ENUM {
  EMAIL = 'email',
  PHONE = 'phone',
  PASSWORD = 'password',
  BIRTHDAY = 'birthday',
  LOGOUT = 'logout'
}

export const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = () => {
  const dispatch = useTypedDispatch();
  const [{ authData }, { availableAccounts }] = useTypedSelector((s) => [s.auth, s.accounts]);

  const [activeModal, setActiveModal] = useState<MODAL_NAMES_ENUM | null>(null);

  const handleSetActiveModal = (value: MODAL_NAMES_ENUM | null) => () => {
    setActiveModal(value);
  };

  const handleChangeBirth = () => {
    dispatch(createToast({ text: 'Date of birth updated' }));
  };

  const handleLogout = () => {
    dispatch(logoutAC());
  };

  const MODAL_NAMES_MAP = {
    [MODAL_NAMES_ENUM.EMAIL]: <ProfileSettingsEmailDialog onClose={handleSetActiveModal(null)} />,
    [MODAL_NAMES_ENUM.PHONE]: <ProfileSettingsPhoneDialog onClose={handleSetActiveModal(null)} />,
    [MODAL_NAMES_ENUM.PASSWORD]: <ProfileSettingsPasswordDialog onClose={handleSetActiveModal(null)} />,
    [MODAL_NAMES_ENUM.BIRTHDAY]: (
      <ProfileSettingsBirthDialog onChangeBirth={handleChangeBirth} onClose={handleSetActiveModal(null)} />
    ),
    [MODAL_NAMES_ENUM.LOGOUT]: (
      <ProfileSettingsLogoutDialog onClose={handleSetActiveModal(null)} onLogout={handleLogout} />
    )
  };

  useEffect(() => {
    if (activeModal) {
      dispatch(toastActions.deleteAllToasts());
    }
  }, [dispatch, activeModal]);

  // TODO waiting for backend, need to insert real data
  return (
    <CenteredPageLayout>
      {activeModal && MODAL_NAMES_MAP[activeModal]}

      <ProfileSettingsHeader avatar={''} role={''} name={authData?.user.name || undefined} />

      <ProfileSettingsInfo
        email={authData?.user.email}
        phone={authData?.user.phone}
        birthday={authData?.user.date_of_birth}
        passwordUpdatedTime={''}
        setActiveModal={setActiveModal}
      />

      <ProfileSettingsContent houses={availableAccounts?.map((a) => a.house)} />

      <div className={s.ProfileSettingsPage__footer}>
        <Button
          onClick={handleSetActiveModal(MODAL_NAMES_ENUM.LOGOUT)}
          rightIcon={<ExitIcon />}
          color="green"
          variant="secondary"
          size="xl">
          Log out
        </Button>

        <NavigationLink as={Link} to={SUPPORT_PAGE_ROUTE} text="Contact support" isUnderline />
      </div>
    </CenteredPageLayout>
  );
};
