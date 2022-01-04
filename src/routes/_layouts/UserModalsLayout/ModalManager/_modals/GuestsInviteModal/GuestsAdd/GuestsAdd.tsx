import React from 'react';

import { GuestsAddDialogContent } from 'common/components/ui/_dialogs/GuestAddDialogContent/GuestAddDialogContent';
import { AccountType } from 'graphql/types';

import { GuestsModalTypes } from '../GuestsInviteModal';

export interface GuestsAddProps {
  accountToEdit: AccountType | null;
  setModalType: React.Dispatch<React.SetStateAction<GuestsModalTypes>>;
  setAccountToEdit: React.Dispatch<React.SetStateAction<AccountType | null>>;
}

export const GuestsAdd: React.FC<GuestsAddProps> = ({ setModalType, accountToEdit, setAccountToEdit }) => {
  const handleCancel = () => {
    setModalType(GuestsModalTypes.VIEW);
  };

  const handleCreated = () => {
    setModalType(GuestsModalTypes.VIEW);
  };

  const handleEdited = () => {
    setAccountToEdit(null);
    setModalType(GuestsModalTypes.VIEW);
  };

  return (
    <GuestsAddDialogContent
      accountToEdit={accountToEdit}
      onCancel={handleCancel}
      onCreated={handleCreated}
      onEdited={handleEdited}
    />
  );
};
