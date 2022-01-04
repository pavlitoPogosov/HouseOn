import React from 'react';

import { useFormikContext } from 'formik';

import { TeamSelectDialog } from 'common/components/ui/_dialogs/TeamSelectDialog/TeamSelectDialog';
import { MEMBERS, TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { CreateTaskFieldNames, CREATE_TASK_FORM_INITIAL_VALUES } from '../CreateTaskPage';

export interface TeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamDialog: React.FC<TeamDialogProps> = ({ isOpen, onClose }) => {
  const { setValues, values } = useFormikContext<typeof CREATE_TASK_FORM_INITIAL_VALUES>();

  const handleSelectTeamMember = (member: TeamMemberType | null) => {
    setValues({
      ...values,
      [CreateTaskFieldNames.TEAM_MEMBER]: member
    });
  };

  return (
    <TeamSelectDialog
      initialSelectedMember={values[CreateTaskFieldNames.TEAM_MEMBER]}
      isOpen={isOpen}
      isTaskDialog
      members={MEMBERS}
      onBack={onClose}
      onClose={onClose}
      setSelectedTeamMember={handleSelectTeamMember}
    />
  );
};
