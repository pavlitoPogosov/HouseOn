import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { TeamMemberCard } from 'common/components/ui/_cards/TeamMemberCard/TeamMemberCard';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { SortByPopup, SortByPopupOption } from 'common/components/ui/SortByPopup/SortByPopup';
import { useInput } from 'common/hooks/useInput';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import s from './DialogSelectMembers.module.scss';

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

export interface IDialogSelectMembersProps {
  isMultiple?: boolean;
  members: TeamMemberType[];
  onlyName?: boolean;
  selectedMember?: TeamMemberType | null;
  selectedMembers?: TeamMemberType[] | null;
  setSelectedMember?: (value: TeamMemberType | null) => void;
  setSelectedMembers?: React.Dispatch<React.SetStateAction<TeamMemberType[] | null>>;
}

// TODO same logic suits for house team, maybe should separate it in common behavior
export const DialogSelectMembers: React.FC<IDialogSelectMembersProps> = (props) => {
  const { isMultiple = false, members, onlyName, selectedMember, setSelectedMember, setSelectedMembers } = props;

  const [selectedSortOption, setSelectedSortOption] = useState(TEAM_MEMBERS_SORT_OPTIONS[0]);
  const [searchValue, handleChangeSearchValue] = useInput();

  const handleSelectMember = useCallback((member: TeamMemberType) => {
    if (!isMultiple) {
      setSelectedMember?.(member);
      return;
    }

    // @ts-ignore
    setSelectedMembers?.((prev: TeamMemberType[]) => {
      if (prev?.find((prevM) => prevM.id === member.id)) {
        return prev?.filter((prevM) => prevM.id !== member.id);
      }

      return [...(prev || []), member];
    });

    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (selectedMember) {
      const cardWrapper = document.getElementById(`${selectedMember.id}`);

      if (cardWrapper) {
        cardWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.DialogSelectMembers__wrapper}>
      <div className={s.DialogSelectMembers__header}>
        <SortByPopup
          containerClassName={s.DialogSelectMembers__sortPopup}
          onChange={setSelectedSortOption}
          options={TEAM_MEMBERS_SORT_OPTIONS}
          selectedOption={selectedSortOption}
        />

        <SearchInput
          containerClassName={s.DialogSelectMembers__searchInput}
          onChange={handleChangeSearchValue}
          value={searchValue}
        />
      </div>

      <div className={s.DialogSelectMembers__content}>
        {shownMembers.map((m) => (
          <div className={s.DialogSelectMembers__teamCard} id={String(m.id)} key={m.id}>
            <TeamMemberCard
              activeProjects={m.activeProjects}
              avatar={m.avatar}
              isActive={Boolean(m.id === selectedMember?.id)}
              isOnline
              name={m.name}
              onClick={() => handleSelectMember(m)}
              onlyName={onlyName}
              role={m.role}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
