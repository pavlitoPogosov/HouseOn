import React from 'react';

import { AccountInviteDialogContent } from 'common/components/ui/_dialogs/AccountInviteDialogContent/AccountInviteDialogContent';
import { AccountType } from 'graphql/types';

export interface AccountInviteProps {
  accountToShowInvite: AccountType;
  setAccountToShownInvite: React.Dispatch<React.SetStateAction<AccountType | null>>;
  title: string;
  description: string;
}

export const AccountInvite: React.FC<AccountInviteProps> = ({
  accountToShowInvite,
  setAccountToShownInvite,
  title,
  description
}) => {
  const handleUpdateAccount = (newAccount: AccountType) => {
    setAccountToShownInvite(newAccount);
  };

  return (
    <AccountInviteDialogContent
      accountToShowInvite={accountToShowInvite}
      onUpdateAccount={handleUpdateAccount}
      title={title}
      description={description}
    />
  );
};
