import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { delayPromise } from '@proscom/ui-utils';
import { ColorfulIconVariants } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { GROUP_CHATS } from 'routes/chat/temproraryData';
import { TChat, TChatsListItem } from 'routes/chat/types';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { findSameIdChat, isGroupListItem } from '../../utils';

import { GroupChatDialogContent } from './GroupChatDialogContent';
import { ModalTypes } from './types';

import s from './GroupChatDialog.module.scss';

export type TGroupChatDialogOnClose = { avatar: string; members: TeamMemberType[]; name: string };

export interface IGroupChatDialogProps {
  chat?: TChatsListItem;
  isOpen: boolean;
  onClose: (data: TGroupChatDialogOnClose) => void;
}

export const GroupChatDialog: React.FC<IGroupChatDialogProps> = (props) => {
  const { chat, isOpen, onClose } = props;

  const [currentChat, setCurrentChat] = useState<TChat | null>(null);

  const [modalType, setModalType] = useState(ModalTypes.VIEW);
  const [avatar, setAvatar] = useState(currentChat?.image || '');
  const [name, setName] = useState(currentChat?.name || chat?.name || '');

  const [chosenMembers, setChosenMembers] = useState<TeamMemberType[]>(currentChat?.members || []);
  const [selectedMembers, setSelectedMembers] = useState<TeamMemberType[]>(currentChat?.members || []);

  const intl = useIntl();

  const handleClose = () => {
    onClose?.({
      avatar,
      members: selectedMembers,
      name
    });
  };

  const handleAddMemberClick = () => {
    setModalType(ModalTypes.ADD_MEMBERS);
  };

  const handleClickSaveBtn = () => {
    if (modalType === ModalTypes.ADD_MEMBERS) {
      setModalType(ModalTypes.VIEW);
      setChosenMembers(selectedMembers);
    }

    handleClose();
  };

  const handleClickCancelBtn = () => {
    if (modalType === ModalTypes.VIEW) {
      handleClose();
    }

    if (modalType === ModalTypes.ADD_MEMBERS) {
      setSelectedMembers(chosenMembers);
      setModalType(ModalTypes.VIEW);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedMembers([]);
      setChosenMembers([]);
      setModalType(ModalTypes.VIEW);
    }

    if (isOpen && chat) {
      if (isGroupListItem(chat)) {
        const newChat = findSameIdChat(GROUP_CHATS, chat);
        if (newChat) {
          delayPromise(25).then(() => setCurrentChat(newChat));
        }
      }
    }
  }, [isOpen, chat]);

  useEffect(() => {
    if (currentChat) {
      setAvatar(currentChat?.image || '');
      setName(currentChat?.name || chat?.name || '');
      setChosenMembers(currentChat?.members || []);
      setSelectedMembers(currentChat?.members || []);
    }
  }, [currentChat]);

  const cancelBtnText =
    modalType === ModalTypes.VIEW
      ? intl.formatMessage({ defaultMessage: 'Cancel', id: 'app.cancel' })
      : intl.formatMessage({ defaultMessage: 'Back', id: 'app.back' });
  const saveBtnText =
    modalType === ModalTypes.ADD_MEMBERS
      ? intl.formatMessage({ defaultMessage: 'Save', id: 'app.modal.save' })
      : intl.formatMessage({ defaultMessage: 'Create', id: 'app.modal.create' });

  return (
    <Dialog
      cancelBtnText={cancelBtnText}
      cancelClassName={s.GroupChatDialog__cancel}
      childrenClassName={s.GroupChatDialog__children}
      // icon={ColorfulIconTypes.COMMENT}
      iconVariant={ColorfulIconVariants.BLUE}
      isHeaderBackButton
      isOpen={isOpen}
      newDesign
      onClickBackBtn={handleClickCancelBtn}
      onClickCancelBtn={handleClickCancelBtn}
      onClickSaveBtn={handleClickSaveBtn}
      onClose={handleClose}
      saveBtnText={saveBtnText}
      saveClassName={s.GroupChatDialog__save}
      title={intl.formatMessage({ defaultMessage: 'New group chat', id: 'chat.dialog.createTitle' })}
    >
      {isOpen && (
        <GroupChatDialogContent
          avatar={avatar}
          chosenMembers={chosenMembers}
          handleAddMemberClick={handleAddMemberClick}
          modalType={modalType}
          name={name}
          selectedMembers={selectedMembers}
          setAvatar={setAvatar}
          setName={setName}
          setSelectedMembers={setSelectedMembers}
        />
      )}
    </Dialog>
  );
};
