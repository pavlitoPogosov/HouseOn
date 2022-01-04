import React, { useEffect } from 'react';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Button } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_ACCEPT_INVITE } from 'graphql/mutations/invite';
import { AccountType, InviteType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import accountsActions from 'redux/slices/accountsSlice';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { LOCAL_STORAGE_KEY_LAST_HOUSE_ID } from 'utils/localStorageKeys';

import s from './InviteForWorker.module.scss';

export interface IInviteForWorkerProps {
  invite: InviteType;
}

export const InviteForWorker: React.FC<IInviteForWorkerProps> = (props) => {
  const { invite } = props;

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
    },
    onError() {
      dispatch(
        createToast({
          text: 'Failed to accept invite. Please, try again',
          title: 'Oops!',
          type: 'error'
        })
      );
    }
  });

  const handleGetAppClick = () => {};

  useEffect(() => {
    acceptInvite({ variables: { public_uuid: invite.public_uuid } });
  }, []);

  return (
    <div className={s.InviteForWorker__container}>
      <Avatar containerClassName={s.InviteForWorker__avatar} height={124} width={124} />

      <Text text="This version of HouseOn is for administrators" variant={TextPropsVariantsEnum.H2} />

      {/* FIX make alive */}

      <Button
        className={s.InviteForWorker__btn}
        color="green"
        onClick={handleGetAppClick}
        size={isTablet ? 'xl' : 'm'}
        variant="primary">
        Get the app
      </Button>
    </div>
  );
};
