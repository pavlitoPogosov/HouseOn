import React from 'react';

import { useApolloClient } from '@apollo/client';
import { useToggle } from '@proscom/ui-react';
import { AccountCard } from 'common/components/ui/_cards/AccountCard/AccountCard';
import { AccountInviteDialogContent } from 'common/components/ui/_dialogs/AccountInviteDialogContent/AccountInviteDialogContent';
import { AdminAddDialog } from 'common/components/ui/_dialogs/AdminAddDialog/AdminAddDialog';
import { GuestAddDialog } from 'common/components/ui/_dialogs/GuestAddDialog/GuestAddDialog';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { QUERY_MODAL_ACCOUNTS } from 'graphql/queries/accounts';
import { AccountRolesEnum, AccountType, InviteType } from 'graphql/types';

export interface MainTabMemberCardProps {
  containerClassName?: string;
  account: AccountType;
}

export const MainTabMemberCard: React.FC<MainTabMemberCardProps> = ({ containerClassName, account }) => {
  const { cache } = useApolloClient();

  const editToggler = useToggle();
  const inviteToggler = useToggle();

  const handleOnChat = () => {};

  const handleUpdateAccount = (newAccount: AccountType) => {
    const variables = {
      input: {
        roles: [AccountRolesEnum.Guest],
        is_deactivated: false
      }
    };

    const prevAccounts = cache.readQuery({
      query: QUERY_MODAL_ACCOUNTS,
      variables
    }) as { result: InviteType[] | undefined };
    cache.writeQuery({
      query: QUERY_MODAL_ACCOUNTS,
      variables,
      data: {
        result:
          prevAccounts?.result?.map((a) => {
            if (a?.id === newAccount?.id) {
              return newAccount;
            }

            return a;
          }) || []
      }
    });
    inviteToggler.unset();
  };

  const title = account.role === AccountRolesEnum.Admin ? 'The admin is created' : 'The guest is created';

  const description =
    account.role === AccountRolesEnum.Admin
      ? 'Now you can share invite link with your admin. In case you’ll need to copy the link again it will be in the admins list'
      : 'Now you can share invite link with your guest. In case you’ll need to copy the link again it will be in the guests list';

  return (
    <>
      <AccountCard
        name={account.name || 'No name'}
        containerClassName={containerClassName}
        onChat={!account.is_pending_invite ? handleOnChat : undefined}
        onEdit={account.is_pending_invite ? editToggler.set : undefined}
        onCopy={account.is_pending_invite ? inviteToggler.set : undefined}
      />

      {account.role === AccountRolesEnum.Admin ? (
        <AdminAddDialog isOpen={editToggler.value} onClose={editToggler.unset} accountToEdit={account} />
      ) : (
        <GuestAddDialog isOpen={editToggler.value} onClose={editToggler.unset} accountToEdit={account} />
      )}

      <Dialog
        isOpen={inviteToggler.value}
        icon={ColorfulIconTypes.GUEST_SETTINGS}
        onClose={inviteToggler.unset}
        title={account.role === AccountRolesEnum.Admin ? 'Admin' : 'Guest'}>
        <AccountInviteDialogContent
          accountToShowInvite={account}
          onUpdateAccount={handleUpdateAccount}
          title={title}
          description={description}
        />
      </Dialog>
    </>
  );
};
