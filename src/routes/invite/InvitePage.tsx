import React, { useLayoutEffect } from 'react';
import { useRouteMatch } from 'react-router';

import { appHistory } from 'appHistory';

import { Logo } from 'common/components/ui/Logo/Logo';
import { SelectLanguage } from 'common/components/ui/Select';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_INVITE } from 'graphql/queries/invite';
import { AccountRolesEnum, InviteType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { LOGIN_PAGE_ROUTE } from 'utils/routes';

import { InviteAcception } from './InviteAcception/InviteAcception';
import { InviteForWorker } from './InviteForWorker/InviteForWorker';

import s from './InvitePage.module.scss';

export interface InvitePageProps {}

export const INVITE_PAGE_QUERY = 'inviteId';

export const getInvitePageQuery = () => {
  const query = new URLSearchParams(window.location.search);

  return query.get(INVITE_PAGE_QUERY);
};

export const InvitePage: React.FC<InvitePageProps> = () => {
  const { authData } = useTypedSelector((s) => s.auth);
  const dispatch = useTypedDispatch();

  const { inviteId } = useRouteMatch<{ inviteId: string }>().params;

  const { data: inviteResp, loading: loadingInvite } = useQueryWithError<
    { result: InviteType },
    { public_uuid: string }
  >(QUERY_INVITE, {
    onError(error) {
      const isNotFound = error.graphQLErrors[0]?.extensions?.code === '404';

      dispatch(
        createToast({
          text: isNotFound ? 'Invite not found' : 'Failed to load invite. Please, try again',
          title: 'Oops!',
          type: 'error'
        })
      );

      appHistory.push(LOGIN_PAGE_ROUTE);
    },
    variables: { public_uuid: inviteId }
  });

  useLayoutEffect(() => {
    if (inviteResp && authData) {
      if (inviteResp.result.creator.id === authData.user.id) {
        dispatch(
          createToast({
            text: 'Failed to load invite. You are a creator of invite',
            title: 'Oops!',
            type: 'error'
          })
        );

        appHistory.push(LOGIN_PAGE_ROUTE);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteResp, authData]);

  const renderContent = (invite: InviteType) => {
    if (invite.account.role === AccountRolesEnum.Worker) {
      return <InviteForWorker invite={invite} />;
    }

    return <InviteAcception invite={invite} />;
  };

  if (loadingInvite || !inviteResp?.result) return null;

  return (
    <div className={s.InvitePage__container}>
      <header className={s.InvitePage__header}>
        <Logo />

        <SelectLanguage />
      </header>

      <main className={s.InvitePage__content}>{renderContent(inviteResp.result)}</main>
    </div>
  );
};
