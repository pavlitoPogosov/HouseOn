import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { TeamMemberCard } from 'common/components/ui/_cards/TeamMemberCard/TeamMemberCard';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_TEAM } from 'graphql/queries/team';
import { AccountFilterInput, AccountRolesEnum, AccountType } from 'graphql/types';
import { getAmpluaName } from 'utils/houseTeam';
import { HOUSE_TEAM_PAGE_ROUTE } from 'utils/routes';

import { SectionHeader } from '../_common/_SectionHeader/SectionHeader';
import { EmptyTeamWarning } from '../_common/EmptyTeamWarning/EmptyTeamWarning';

import s from './TeamSection.module.scss';

export const TeamSection: React.FC<unknown> = () => {
  const intl = useIntl();

  const { data: members } = useQueryWithError<{ result: AccountType[] }, { input: AccountFilterInput }>(QUERY_TEAM, {
    variables: {
      input: {
        is_deactivated: false,
        is_pending_invite: false,
        roles: [AccountRolesEnum.Worker]
      }
    }
  });

  const isEmpty = !members?.result || members.result.length === 0;

  const renderContent = useCallback(
    () =>
      members?.result?.map((account) => (
        <Link
          className={s.TeamSection__card}
          key={account.id}
          to={HOUSE_TEAM_PAGE_ROUTE + `?selectedMemberId=${account.id}`}
        >
          <TeamMemberCard
            activeProjects={0}
            avatar=""
            isOnline
            name={account.name || ''}
            role={getAmpluaName(account.amplua || '', intl)}
          />
        </Link>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [members]
  );

  return (
    <>
      <SectionHeader
        title={intl.formatMessage({
          defaultMessage: 'Team',
          id: 'index.houseTeam.title'
        })}
        to={HOUSE_TEAM_PAGE_ROUTE}
      />

      {isEmpty ? <EmptyTeamWarning /> : renderContent()}
    </>
  );
};
