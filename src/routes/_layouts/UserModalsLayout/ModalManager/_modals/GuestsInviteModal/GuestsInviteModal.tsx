import React, { useState } from 'react';

import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_MODAL_ACCOUNTS } from 'graphql/queries/accounts';
import { AccountFilterInput, AccountRolesEnum, AccountType } from 'graphql/types';

import { AccountInvite } from '../_common/AccountInvite/AccountInvite';
import { AccountsView } from '../_common/AccountsView/AccountsView';

import { GuestsAdd } from './GuestsAdd/GuestsAdd';

export interface GuestsInviteModalProps {
  onClose: () => void;
}

export enum GuestsModalTypes {
  VIEW = 'view',
  ADD = 'add'
}

export const GuestsInviteModal: React.FC<GuestsInviteModalProps> = ({ onClose }) => {
  const [modalType, setModalType] = useState(GuestsModalTypes.VIEW);

  const [accountToEdit, setAccountToEdit] = useState<AccountType | null>(null);
  const [accountToShowInvite, setAccountToShownInvite] = useState<AccountType | null>(null);

  const { data: accountsResp, loading: loadingAccounts } = useQueryWithError<
    { result: AccountType[] },
    { input: AccountFilterInput }
  >(QUERY_MODAL_ACCOUNTS, {
    variables: {
      input: {
        roles: [AccountRolesEnum.Guest],
        is_deactivated: false
      }
    }
  });

  const handleAccountEdit = (account: AccountType) => {
    setAccountToEdit(account);
    setModalType(GuestsModalTypes.ADD);
  };

  const handleAccountShowInvite = (account: AccountType) => {
    setAccountToShownInvite(account);
  };

  const renderContent = () => {
    if (modalType === GuestsModalTypes.ADD) {
      return (
        <GuestsAdd setModalType={setModalType} accountToEdit={accountToEdit} setAccountToEdit={setAccountToEdit} />
      );
    }

    if (accountToShowInvite) {
      return (
        <AccountInvite
          accountToShowInvite={accountToShowInvite}
          setAccountToShownInvite={setAccountToShownInvite}
          title="The guest is created"
          description="Now you can share invite link with your guest. In case you’ll need to copy the link again it will be in the guests list"
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
    modalType === GuestsModalTypes.ADD && accountToEdit
      ? 'Edit guest'
      : modalType === GuestsModalTypes.ADD
      ? 'New guest'
      : 'Guests';

  const handleClickHeaderBtn = () => {
    setModalType(GuestsModalTypes.ADD);
  };

  return (
    <Dialog
      isOpen
      icon={ColorfulIconTypes.GUEST_SETTINGS}
      title={title}
      onClose={onClose}
      headerBtnText="Add new"
      onClickHeaderBtn={modalType === GuestsModalTypes.VIEW && !accountToShowInvite ? handleClickHeaderBtn : undefined}>
      {renderContent()}
    </Dialog>
  );
};
