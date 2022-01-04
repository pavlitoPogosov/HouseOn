import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { TChat, TChatMember } from 'routes/chat/types';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { ConfirmDeleteDialogContent } from '../../../_common/ConfirmDeleteDialogContent/ConfirmDeleteDialogContent';
import { MemberCard } from '../../../_common/MemberSelectDialogContent/MemberCard/MemberCard';
import { MemberSelectDialogContent } from '../../../_common/MemberSelectDialogContent/MemberSelectDialogContent';
import { isGroup } from '../../../utils';

import s from './MembersDialog.module.scss';

export interface IMembersDialogProps {
  allMembers: TeamMemberType[];
  isOpen: boolean;
  onChange: (newMembers: TeamMemberType[] | null) => void;
  onClose: () => void;
  selectedChat: TChat;
}

enum ModalTypes {
  ADD = 'add',
  DELETE_CONFIRM = 'delete',
  VIEW = 'view'
}

export const MembersDialog: React.FC<IMembersDialogProps> = (props) => {
  const { allMembers, isOpen, onChange, onClose, selectedChat } = props;

  const isGroupChat = isGroup(selectedChat);
  const currentMembersInitial = isGroupChat ? selectedChat.members : [];

  const [modalType, setModalType] = useState(ModalTypes.VIEW);
  const [currentMembers, setCurrentMembers] = useState(currentMembersInitial || []);
  const [deletedMemberId, setDeletedMemberId] = useState<string | number | null>(null);

  const intl = useIntl();

  const handleCancelClick = () => {
    if (modalType === ModalTypes.VIEW) {
      onClose();
    }

    if (modalType === ModalTypes.ADD) {
      setModalType(ModalTypes.VIEW);
      if (isGroupChat) {
        setCurrentMembers(selectedChat.members || []);
      }
    }

    if (modalType === ModalTypes.DELETE_CONFIRM) {
      setDeletedMemberId(null);
      setModalType(ModalTypes.VIEW);
    }
  };

  const handleSaveBtnClick = () => {
    if (modalType === ModalTypes.DELETE_CONFIRM) {
      const newMembers = currentMembers?.filter((m) => m.id !== deletedMemberId);

      // update local and global members state
      onChange(newMembers || null);
      setCurrentMembers(newMembers || null);

      // reset states
      setDeletedMemberId(null);
      setModalType(ModalTypes.VIEW);
    }

    if (modalType === ModalTypes.ADD) {
      if (currentMembers) {
        onChange(currentMembers);
      }

      onClose();
    }
  };

  const handleClickHeaderBtn = () => {
    setModalType(ModalTypes.ADD);
  };

  const handleDeleteMember = (memberId: string | number) => {
    /* TODO: подключить graphql */

    return () => {
      setDeletedMemberId(memberId);
      setModalType(ModalTypes.DELETE_CONFIRM);
    };
  };

  const renderContent = () => {
    if (modalType === ModalTypes.ADD) {
      return (
        <MemberSelectDialogContent
          members={allMembers}
          onlyName
          selectedMembers={currentMembers || []}
          setSelectedMembers={setCurrentMembers}
        />
      );
    }

    if (modalType === ModalTypes.VIEW) {
      return (
        <div className={s.MembersDialog__cardsContainer}>
          {isGroupChat &&
            selectedChat.members?.map((m) => (
              <MemberCard
                avatar={m.avatar || ''}
                containerClassName={s.MembersDialog__card}
                key={m.id}
                name={m.name}
                onDelete={handleDeleteMember(m.id)}
              />
            ))}
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (!isOpen) {
      setModalType(ModalTypes.VIEW);
    } else {
      if (isGroupChat) {
        setCurrentMembers(selectedChat.members || []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const deleteCancelModalText =
    modalType === ModalTypes.DELETE_CONFIRM &&
    intl.formatMessage({ defaultMessage: 'No, don’t remove', id: 'chat.dialog.cancelRemove' });
  const addCancelModalText =
    modalType === ModalTypes.ADD && intl.formatMessage({ defaultMessage: 'Back', id: 'app.back' });

  const cancelBtnText = deleteCancelModalText || addCancelModalText || undefined;

  const deleteSaveModalText =
    modalType === ModalTypes.DELETE_CONFIRM &&
    intl.formatMessage({ defaultMessage: 'Yes, remove', id: 'app.dialog.remove' });
  const addSaveModalText =
    modalType === ModalTypes.ADD && intl.formatMessage({ defaultMessage: 'Save', id: 'app.dialog.save' });

  const saveBtnText = deleteSaveModalText || addSaveModalText || undefined;

  const memberToDelete = isGroupChat
    ? (selectedChat.members?.find((m) => m.id === deletedMemberId) as TChatMember)
    : undefined;
  const confirmDeleteMessage = intl.formatMessage(
    {
      defaultMessage: 'Are you sure you want to remove {memberNameToDelete} from the chat “${selectedChatName}”?',
      id: 'chat.dialog.deleteFromChatConfirm'
    },
    {
      memberNameToDelete: memberToDelete?.name,
      selectedChatName: selectedChat.name
    }
  );

  const headerBtnText =
    modalType === ModalTypes.VIEW ? intl.formatMessage({ defaultMessage: 'Add new', id: 'app.addNew' }) : undefined;

  const onClickCancelBtn = modalType !== ModalTypes.VIEW ? handleCancelClick : undefined;
  const onClickSaveBtn = modalType !== ModalTypes.VIEW ? handleSaveBtnClick : undefined;

  if (isOpen) {
    return modalType === ModalTypes.DELETE_CONFIRM ? (
      <ConfirmDeleteDialogContent
        cancelBtnText={intl.formatMessage({ defaultMessage: 'No, don’t remove', id: 'app.dialog.cancelRemove' })}
        isOpen={isOpen}
        message={confirmDeleteMessage}
        onClickCancelBtn={handleCancelClick}
        onClickSaveBtn={handleSaveBtnClick}
        onClose={onClose}
        saveBtnText={intl.formatMessage({ defaultMessage: 'Yes, remove', id: 'app.dialog.remove' })}
      />
    ) : (
      <Dialog
        cancelBtnText={cancelBtnText}
        childrenClassName={s.MembersDialog__children}
        headerBtnClassName={s.MembersDialog__headerBtn}
        headerBtnText={headerBtnText}
        // icon={ColorfulIconTypes.GUEST}
        isHeaderBackButton
        isOpen={isOpen}
        newDesign
        onClickBackBtn={onClickCancelBtn}
        onClickCancelBtn={onClickCancelBtn}
        onClickHeaderBtn={handleClickHeaderBtn}
        onClickSaveBtn={onClickSaveBtn}
        onClose={onClose}
        saveBtnText={saveBtnText}
        title="Members"
      >
        {renderContent()}
      </Dialog>
    );
  }

  return null;
};
