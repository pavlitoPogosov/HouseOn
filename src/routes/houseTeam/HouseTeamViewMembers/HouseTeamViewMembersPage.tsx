import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useQuery } from 'common/hooks/useQuery';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_ACCOUNTS } from 'graphql/queries/accounts';
import { AccountFilterInput, AccountRolesEnum, AccountType } from 'graphql/types';
import { AsideLayoutLeft } from 'routes/_layouts/AsideLayoutLeft/AsideLayoutLeft';

import { SelectedMemberContent } from './SelectedMemberContent/SelectedMemberContent';
import { TeamMemberSelect } from './TeamMemberSelect/TeamMemberSelect';

import s from './HouseTeamViewMembersPage.module.scss';

export interface HouseTeamViewMembersPageProps {}

export const HouseTeamViewMembersPage: React.FC<HouseTeamViewMembersPageProps> = () => {
  const history = useHistory();
  const query = useQuery();

  const shouldAdapt = useMediaQuery('(max-width: 1119px)');

  const [selectedMember, setSelectedMember] = useState<AccountType | null>(null);
  const { data: members, loading } = useQueryWithError<{ result: AccountType[] }, { input: AccountFilterInput }>(
    QUERY_ACCOUNTS,
    {
      variables: {
        input: {
          roles: [AccountRolesEnum.Worker]
        }
      }
    }
  );

  useEffect(() => {
    if (members) {
      selectUserById();
    }
  }, [members, query]);

  const handleSelectMember = async (member: AccountType | null) => {
    if (member) {
      query.set('selectedMemberId', String(member.id));
      selectUserById();
    } else {
      query.delete('selectedMemberId');
    }
    history.push({ search: query.toString() });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const selectUserById = () => {
    const accountId = query.get('selectedMemberId');
    const account = members?.result.find(({ id }) => id === accountId);
    if (account) {
      setSelectedMember(account);
    } else {
      setSelectedMember(null);
    }
  };

  const SelectedMemberCmp = (
    <SelectedMemberContent
      hasMembers={!!members && !!members.result.length}
      selectedMember={selectedMember}
      shouldAdapt={shouldAdapt}
      setSelectedMember={handleSelectMember}
    />
  );

  const TeamMemberCmp = (
    <TeamMemberSelect
      members={!!members ? members.result : []}
      shouldAdapt={shouldAdapt}
      selectedMember={selectedMember}
      loading={loading}
      setSelectedMember={handleSelectMember}
    />
  );

  return (
    <AsideLayoutLeft
      mobileQuery="(max-width: 1119px)"
      mainCmp={shouldAdapt ? (selectedMember !== null ? SelectedMemberCmp : TeamMemberCmp) : SelectedMemberCmp}
      asideCmp={TeamMemberCmp}
      asideClassName={s.HouseTeamViewMembersPage__aside}
      mainClassName={s.HouseTeamViewMembersPage__main}
    />
  );
};
