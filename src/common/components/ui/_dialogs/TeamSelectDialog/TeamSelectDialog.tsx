import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { DialogConfirmMember } from './DialogConfirmMember/DialogConfirmMember';
import { DialogSelectMembers } from './DialogSelectMembers/DialogSelectMembers';

import s from './TeamSelectDialog.module.scss';

export interface ITeamSelectDialogProps {
  blackoutClassName?: string;
  initialSelectedMember?: TeamMemberType | null;
  initialSelectedMembers?: TeamMemberType[] | null;
  isMultiple?: boolean;
  isOpen: boolean;
  isTaskDialog: boolean;
  members: TeamMemberType[];
  onBack: () => void;
  onClose: () => void;
  onlyName?: boolean;
  setSelectedTeamMember?: (newMember: TeamMemberType | null) => void;
  setSelectedTeamMembers?: (newMembers: TeamMemberType[] | null) => void;
  title?: string;
}

enum DialogTypes {
  SELECT_MEMBER = 0,
  CONFIRM_MEMBER = 1
}

export const TeamSelectDialog: React.FC<ITeamSelectDialogProps> = (props) => {
  const {
    blackoutClassName,
    initialSelectedMember,
    initialSelectedMembers,
    isMultiple,
    isOpen,
    isTaskDialog,
    members,
    onBack,
    onClose,
    onlyName,
    setSelectedTeamMember,
    setSelectedTeamMembers,
    title
  } = props;

  const [activeDialogType, setActiveDialogType] = useState(DialogTypes.SELECT_MEMBER);
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(initialSelectedMember || null);
  const [selectedMembers, setSelectedMembers] = useState<TeamMemberType[] | null>(initialSelectedMembers || null);

  const handleSave = () => {
    if (
      isTaskDialog &&
      activeDialogType === DialogTypes.SELECT_MEMBER &&
      initialSelectedMember?.id !== selectedMember?.id
    ) {
      return setActiveDialogType(DialogTypes.CONFIRM_MEMBER);
    }

    setSelectedTeamMember?.(selectedMember);
    setSelectedTeamMembers?.(selectedMembers);
    onClose();
  };

  const handleCancel = () => {
    if (activeDialogType === DialogTypes.CONFIRM_MEMBER) {
      return setActiveDialogType(DialogTypes.SELECT_MEMBER);
    }

    onClose();
  };

  const handleBack = () => {
    onBack?.();
  };

  useEffect(() => {
    setActiveDialogType(DialogTypes.SELECT_MEMBER);
    setSelectedMember(initialSelectedMember || null);
    setSelectedMembers(initialSelectedMembers || null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Dialog
      blackoutClassName={clsx(s.TeamSelectDialog__blackout, blackoutClassName)}
      cancelBtnText="Cancel"
      cancelClassName={s.TeamSelectDialog__cancel}
      childrenClassName={s.TeamSelectDialog__team_container}
      childrenWrapperClassName={s.TeamSelectDialog__container}
      disableOverflowControl
      footerClassName={s.TeamSelectDialog__footer}
      headerClassName={s.TeamSelectDialog__header}
      isCloseButton={false}
      isHeaderBackButton
      isOpen={isOpen}
      newDesign
      onClickBackBtn={handleBack}
      onClickCancelBtn={handleCancel}
      onClickSaveBtn={selectedMember ? handleSave : undefined}
      onClose={onClose}
      saveClassName={s.TeamSelectDialog__save}
      title={title || 'Set house team'}>
      {activeDialogType === DialogTypes.SELECT_MEMBER ? (
        <DialogSelectMembers
          isMultiple={isMultiple}
          members={members}
          onlyName={onlyName}
          selectedMember={selectedMember}
          selectedMembers={selectedMembers}
          setSelectedMember={setSelectedMember}
          setSelectedMembers={setSelectedMembers}
        />
      ) : (
        <DialogConfirmMember isReassigning={!!initialSelectedMember} selectedMember={selectedMember!} />
      )}
    </Dialog>
  );
};
