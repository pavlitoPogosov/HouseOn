import React from 'react';
import { useIntl } from 'react-intl';

import { TeamMemberShortenedCard } from 'common/components/ui/_cards/TeamMemberShortenedCard/TeamMemberShortenedCard';
import { TeamSelectDialog } from 'common/components/ui/_dialogs/TeamSelectDialog/TeamSelectDialog';
import { MEMBERS, TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { SectionWrapper } from '../SectionWrapper/SectionWrapper';

export interface TeamSectionProps {
  dialogToggler: {
    set: () => void;
    unset: () => void;
    value: boolean;
  };
  selectedTeamMember: TeamMemberType | null;
  setSelectedTeamMember: React.Dispatch<React.SetStateAction<TeamMemberType | null>>;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  dialogToggler,
  selectedTeamMember,
  setSelectedTeamMember
}) => {
  const intl = useIntl();

  return (
    <SectionWrapper title={intl.formatMessage({ defaultMessage: 'Required house team', id: 'tasks.team.title' })}>
      <TeamMemberShortenedCard
        avatar={selectedTeamMember?.avatar}
        onClickEdit={dialogToggler.set}
        role={selectedTeamMember?.role}
      />

      <TeamSelectDialog
        initialSelectedMember={selectedTeamMember}
        isOpen={dialogToggler.value}
        isTaskDialog
        members={MEMBERS}
        onBack={dialogToggler.unset}
        onClose={dialogToggler.unset}
        setSelectedTeamMember={setSelectedTeamMember}
      />
    </SectionWrapper>
  );
};
