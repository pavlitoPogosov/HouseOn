import React, { useMemo, useState } from 'react';

import { TeamMemberCard } from 'common/components/ui/_cards/TeamMemberCard/TeamMemberCard';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { SortByPopup, SortByPopupOption } from 'common/components/ui/SortByPopup/SortByPopup';
import { useInput } from 'common/hooks/useInput';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import s from './MemberSelectDialogContent.module.scss';

export interface IMemberSelectDialogContentProps {
  isSingle?: boolean;
  members: TeamMemberType[];
  onlyName?: boolean;
  selectedMembers: TeamMemberType[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<TeamMemberType[]>>;
}

const TEAM_MEMBERS_SORT_OPTIONS: SortByPopupOption[] = [
  { text: 'All amplua', value: 'All' },
  { text: 'Gardener', value: 'Gardener' },
  { text: 'Florist', value: 'Florist' },
  {
    bottomDivider: true,
    text: 'Manager',
    value: 'Manager'
  },
  { text: 'Archived', value: 'Archived' }
];

export const MemberSelectDialogContent: React.FC<IMemberSelectDialogContentProps> = (props) => {
  const { isSingle, members, onlyName, selectedMembers, setSelectedMembers } = props;

  const [selectedSortOption, setSelectedSortOption] = useState(TEAM_MEMBERS_SORT_OPTIONS[0]);
  const [searchValue, handleChangeSearchValue] = useInput();

  const handleMemberSelect = (newM: TeamMemberType) => {
    if (!selectedMembers.length || isSingle) {
      setSelectedMembers([newM]);
    } else {
      setSelectedMembers((prev) => {
        if (prev?.find((prevM) => prevM.id === newM.id)) {
          return prev?.filter((prevM) => prevM.id !== newM.id);
        }

        return [...(prev || []), newM];
      });
    }
  };

  const shownMembers = useMemo(() => {
    let membersToReturn: TeamMemberType[] = members;

    const isArchived = selectedSortOption.value === 'Archived';
    const isRole = selectedSortOption.value !== 'All' && !isArchived;

    if (isArchived) {
      membersToReturn = members.filter((m) => m.isArchived);
    }

    if (isRole) {
      membersToReturn = members.filter((m) => m.role === selectedSortOption.value);
    }

    return membersToReturn.filter((m) => m.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
  }, [searchValue, selectedSortOption.value, members]);

  return (
    <div className={s.MemberSelectDialogContent__container}>
      <div className={s.MemberSelectDialogContent__header}>
        <SortByPopup
          containerClassName={s.MemberSelectDialogContent__sortPopup}
          onChange={setSelectedSortOption}
          options={TEAM_MEMBERS_SORT_OPTIONS}
          selectedOption={selectedSortOption}
        />

        <SearchInput
          containerClassName={s.MemberSelectDialogContent__searchInput}
          onChange={handleChangeSearchValue}
          value={searchValue}
        />
      </div>

      <div className={s.MemberSelectDialogContent__content}>
        {shownMembers.map((m) => (
          <TeamMemberCard
            activeProjects={m.activeProjects}
            avatar={m.avatar}
            isActive={!!selectedMembers?.find((selectedM) => selectedM?.id === m.id)}
            isOnline
            key={m.id}
            name={m.name}
            onClick={() => handleMemberSelect(m)}
            onlyName={onlyName}
            role={m.role}
          />
        ))}
      </div>
    </div>
  );
};
