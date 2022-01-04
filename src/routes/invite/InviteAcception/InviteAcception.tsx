import React from 'react';

import { appHistory } from 'appHistory';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Button } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_ACCEPT_INVITE } from 'graphql/mutations/invite';
import { AccountType, InviteType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import accountsActions from 'redux/slices/accountsSlice';
import { handleNoAvailableAccountsErrorAC } from 'redux/slices/accountsSlice/actionCreators';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { LOCAL_STORAGE_KEY_LAST_HOUSE_ID } from 'utils/localStorageKeys';
import { HOUSE_PAGE_ROUTE, INDEX_PAGE_ROUTE } from 'utils/routes';

import s from './InviteAcception.module.scss';

export interface InviteAcceptionProps {
  invite: InviteType;
}
// FIX add avatars images
// FIX обработать кейс, когда идет переключение на аккаунт воркера в приложении
export const InviteAcception: React.FC<InviteAcceptionProps> = ({ invite }) => {
  const { availableAccounts } = useTypedSelector((s) => s.accounts);
  const dispatch = useTypedDispatch();

  const isTablet = useMediaQuery('(min-width: 576px)');

  const [acceptInvite, { loading: acceptingInvite }] = useMutationWithError<
    { result: AccountType },
    { public_uuid: string }
  >(MUTATION_ACCEPT_INVITE, {
    onCompleted(data) {
      dispatch(accountsActions.addNewAccount(data.result));
      dispatch(accountsActions.setCurrentAccountId(data.result.id));
      dispatch(accountsActions.setCurrentHouseId(data.result.house_id));

      localStorage.setItem(LOCAL_STORAGE_KEY_LAST_HOUSE_ID, data.result.house_id);

      appHistory.push(
        availableAccounts?.length ? HOUSE_PAGE_ROUTE.replace(':id(\\d+)', data.result.house_id) : INDEX_PAGE_ROUTE
      );
    },
    onError() {
      dispatch(
        createToast({
          title: 'Oops!',
          text: 'Failed to accept invite. Please, try again',
          type: 'error'
        })
      );
    }
  });

  const handleAcceptInvite = () => {
    acceptInvite({
      variables: { public_uuid: invite.public_uuid }
    });
  };

  const handleDeclineInvite = () => {
    if (availableAccounts?.length) {
      appHistory.push(INDEX_PAGE_ROUTE);
    } else {
      dispatch(handleNoAvailableAccountsErrorAC());
    }
  };

  const title = invite.creator.name
    ? `${invite.creator.name} has invited you to ${invite.house.title}`
    : `Owner of ${invite.house.title} has invited you to join`;

  return (
    <div className={s.InviteAcception__container}>
      <div className={s.InviteAcception__avatarsWrapper}>
        <Avatar width={124} height={124} containerClassName={s.InviteAcception__avatar} />

        <Avatar width={124} height={124} containerClassName={s.InviteAcception__avatar} />
      </div>

      <Text variant={TextPropsVariantsEnum.H2} text={title} />

      <div className={s.InviteAcception__btns}>
        <Button
          onClick={handleAcceptInvite}
          color="green"
          variant="primary"
          size={isTablet ? 'xl' : 'm'}
          className={s.InviteAcception__btn}
          isLoading={acceptingInvite}>
          Accept invite
        </Button>

        <Button
          onClick={handleDeclineInvite}
          color="green"
          variant="secondary"
          size={isTablet ? 'xl' : 'm'}
          className={s.InviteAcception__btn}
          disabled={acceptingInvite}>
          Decline invite
        </Button>
      </div>
    </div>
  );
};
