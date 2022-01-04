import React, { useEffect } from 'react';

import { TeamMemberShortenedCard } from 'common/components/ui/_cards/TeamMemberShortenedCard/TeamMemberShortenedCard';
import { TeamSelectDialog } from 'common/components/ui/_dialogs/TeamSelectDialog/TeamSelectDialog';
import { MODAL_OVERLAY_CHILDREN_ID } from 'common/components/ui/Overlay/Overlay';
import { MEMBERS, TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import s from './TeamSelectField.module.scss';

export interface TeamSelectFieldProps {
  selectedTeamMember: TeamMemberType | null;
  setSelectedTeamMember: React.Dispatch<React.SetStateAction<TeamMemberType | null>>;
  dialogToggler: {
    value: boolean;
    unset: () => void;
    set: () => void;
  };
}

export const TeamSelectField: React.FC<TeamSelectFieldProps> = ({
  dialogToggler,
  selectedTeamMember,
  setSelectedTeamMember
}) => {
  useEffect(() => {
    const modalChildrenDiv = document.getElementById(MODAL_OVERLAY_CHILDREN_ID);

    if (modalChildrenDiv) {
      modalChildrenDiv.style.overflowY = dialogToggler.value ? 'hidden' : 'scroll';
    }
  }, [dialogToggler.value]);

  return (
    <>
      <TeamMemberShortenedCard
        avatar={selectedTeamMember?.avatar}
        role={selectedTeamMember?.role}
        onClickEdit={dialogToggler.set}
      />
      <TeamSelectDialog
        isOpen={dialogToggler.value}
        onClose={dialogToggler.unset}
        onBack={dialogToggler.unset}
        initialSelectedMember={selectedTeamMember}
        setSelectedTeamMember={setSelectedTeamMember}
        blackoutClassName={s.TeamSelectField__dialogBlackout}
        members={MEMBERS}
        isTaskDialog
      />

      {/* FIX переделать этот момент */}
      {dialogToggler.value && <div className={s.TeamSelectField__blackout} />}
    </>
  );
};
