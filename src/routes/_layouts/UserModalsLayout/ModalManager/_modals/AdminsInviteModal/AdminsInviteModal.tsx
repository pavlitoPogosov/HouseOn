import React, { useState } from 'react';

import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_MODAL_ACCOUNTS } from 'graphql/queries/accounts';
import { AccountFilterInput, AccountRolesEnum, AccountType } from 'graphql/types';

import { AccountInvite } from '../_common/AccountInvite/AccountInvite';
import { AccountsView } from '../_common/AccountsView/AccountsView';

import { AdminsAdd } from './AdminsAdd/AdminsAdd';

export interface AdminsInviteModalProps {
  onClose: () => void;
}

export enum AdminModalsTypes {
  VIEW = 'view',
  ADD = 'add'
}

export const AdminsInviteModal: React.FC<AdminsInviteModalProps> = ({ onClose }) => {
  const [modalType, setModalType] = useState(AdminModalsTypes.VIEW);

  const [accountToEdit, setAccountToEdit] = useState<AccountType | null>(null);
  const [accountToShowInvite, setAccountToShownInvite] = useState<AccountType | null>(null);

  const { data: accountsResp, loading: loadingAccounts } = useQueryWithError<
    { result: AccountType[] },
    { input: AccountFilterInput }
  >(QUERY_MODAL_ACCOUNTS, {
    variables: {
      input: {
        roles: [AccountRolesEnum.Admin],
        is_deactivated: false
      }
    }
  });

  const handleAccountEdit = (account: AccountType) => {
    setAccountToEdit(account);
    setModalType(AdminModalsTypes.ADD);
  };

  const handleAccountShowInvite = (account: AccountType) => {
    setAccountToShownInvite(account);
  };

  const renderContent = () => {
    if (modalType === AdminModalsTypes.ADD) {
      return (
        <AdminsAdd setModalType={setModalType} accountToEdit={accountToEdit} setAccountToEdit={setAccountToEdit} />
      );
    }

    if (accountToShowInvite) {
      return (
        <AccountInvite
          accountToShowInvite={accountToShowInvite}
          setAccountToShownInvite={setAccountToShownInvite}
          title="The admin is created"
          description="Now you can share invite link with your admin. In case you’ll need to copy the link again it will be in the admins list"
        />
      );
    }

    return (
      <AccountsView
        accounts={accountsResp?.result}
        isLoading={loadingAccounts}
        onAccountEdit={handleAccountEdit}
        onAccountShowInvite={handleAccountShowInvite}
      />
    );
  };

  const title =
    modalType === AdminModalsTypes.ADD && accountToEdit
      ? 'Edit admin'
      : modalType === AdminModalsTypes.ADD
      ? 'New admin'
      : 'Admins';

  const handleClickHeaderBtn = () => {
    setModalType(AdminModalsTypes.ADD);
  };

  return (
    <Dialog
      isOpen
      icon={ColorfulIconTypes.GUEST_SETTINGS}
      title={title}
      onClose={onClose}
      headerBtnText="Add new"
      onClickHeaderBtn={modalType === AdminModalsTypes.VIEW && !accountToShowInvite ? handleClickHeaderBtn : undefined}>
      {renderContent()}
    </Dialog>
  );
};
