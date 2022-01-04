import React from 'react';

import moment from 'moment';

import { CreatedEntityLinkDialogContent } from 'common/components/ui/_dialogs/CreatedEntityLinkDialogContent/CreatedEntityLinkDialogContent';
import { Button } from 'common/components/ui/Button';
import { ErrorMessage } from 'common/components/ui/ErrorMessage/ErrorMessage';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_UPDATE_MODAL_ACCOUNT } from 'graphql/mutations/accounts';
import { AccountType, AccountUpdateInput } from 'graphql/types';
import { DEFAULT_ERROR_MESSAGE } from 'utils/errorMessages';
import { INVITE_PAGE_ROUTE } from 'utils/routes';

import s from './AccountInviteDialogContent.module.scss';

export interface AccountInviteDialogContentProps {
  accountToShowInvite: AccountType;
  onUpdateAccount: (newAccount: AccountType) => void;
  title: string;
  description: string;
}

export const AccountInviteDialogContent: React.FC<AccountInviteDialogContentProps> = ({
  accountToShowInvite,
  onUpdateAccount,
  title,
  description
}) => {
  const isLinkExpired =
    accountToShowInvite.expires_at &&
    moment().startOf('day').isSameOrAfter(accountToShowInvite.expires_at.startOf('day'));
  const isTablet = useMediaQuery('(min-width: 576px)');

  const [updateAccount, { loading: updatingAccount, error: errorUpdatingAccount }] = useMutationWithError<
    { result: AccountType },
    { input: AccountUpdateInput }
  >(MUTATION_UPDATE_MODAL_ACCOUNT, {
    onCompleted({ result }) {
      onUpdateAccount(result);
    }
  });

  const handleGenerateNewLink = () => {
    updateAccount({
      variables: {
        input: {
          id: accountToShowInvite.id,
          amplua: accountToShowInvite.amplua,
          expires_at: moment().startOf('day').add(1, 'month')
        }
      }
    });
  };

  if (isLinkExpired || !accountToShowInvite.invite?.public_uuid) {
    return (
      <>
        <CreatedEntityLinkDialogContent
          title="Invite link has expired"
          description="Generate new link and share it with invited admin"
          disableFooter
        />

        {errorUpdatingAccount && (
          <ErrorMessage error={DEFAULT_ERROR_MESSAGE} className={s.AccountInviteDialogContent__error} />
        )}

        <Button
          size={isTablet ? 'm' : 's'}
          color="orange"
          onClick={handleGenerateNewLink}
          className={s.AccountInviteDialogContent__btn}
          isLoading={updatingAccount}>
          Generate new link
        </Button>
      </>
    );
  }

  const link = window.origin + INVITE_PAGE_ROUTE.replace(':inviteId', accountToShowInvite.invite!.public_uuid);

  return <CreatedEntityLinkDialogContent title={title} description={description} link={link} />;
};
