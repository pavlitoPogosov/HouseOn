import React from 'react';
import { useIntl } from 'react-intl';

import { TeamSelectDialog } from 'common/components/ui/_dialogs/TeamSelectDialog/TeamSelectDialog';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import s from './PersonalChatDialog.module.scss';

export interface IPersonalChatDialogProps {
  initialSelectedMember?: TeamMemberType;
  isOpen: boolean;
  members: TeamMemberType[];
  onBack: () => void;
  onClose: () => void;
  setSelectedTeamMember: (newMember: TeamMemberType | null) => void;
}

export const PersonalChatDialog: React.FC<IPersonalChatDialogProps> = (props) => {
  const { initialSelectedMember, isOpen, members, onBack, onClose, setSelectedTeamMember } = props;

  const intl = useIntl();

  const modalTitle = intl.formatMessage({
    defaultMessage: 'Performers',
    id: 'chat.modal.personal.title'
  });

  return !isOpen ? null : (
    <TeamSelectDialog
      blackoutClassName={s.PersonalChatDialog__TeamSelectDialog_blackout}
      initialSelectedMember={initialSelectedMember || null}
      isOpen
      isTaskDialog={false}
      members={members || []}
      onBack={onBack}
      onClose={onClose}
      onlyName
      setSelectedTeamMember={setSelectedTeamMember}
      title={modalTitle}
    />
  );
};
