import React from 'react';

import { useApolloClient } from '@apollo/client';
import { AdminAddDialogContent } from 'common/components/ui/_dialogs/AdminAddDialogContent/AdminAddDialogContent';
import { AccountType } from 'graphql/types';

import { AdminModalsTypes } from '../AdminsInviteModal';

export interface AdminsAddProps {
  accountToEdit: AccountType | null;
  setModalType: React.Dispatch<React.SetStateAction<AdminModalsTypes>>;
  setAccountToEdit: React.Dispatch<React.SetStateAction<AccountType | null>>;
}

export const AdminsAdd: React.FC<AdminsAddProps> = ({ accountToEdit, setAccountToEdit, setModalType }) => {
  const { cache } = useApolloClient();

  const handleCancel = () => {
    setModalType(AdminModalsTypes.VIEW);
  };

  const handleCreated = () => {
    setModalType(AdminModalsTypes.VIEW);
  };

  const handleEdited = () => {
    setAccountToEdit(null);
    setModalType(AdminModalsTypes.VIEW);
  };

  return (
    <AdminAddDialogContent
      accountToEdit={accountToEdit}
      onCancel={handleCancel}
      onCreated={handleCreated}
      onEdited={handleEdited}
    />
  );
};
