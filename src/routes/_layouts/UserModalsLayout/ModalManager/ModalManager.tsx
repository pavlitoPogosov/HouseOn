import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { AdminAddDialog } from 'common/components/ui/_dialogs/AdminAddDialog/AdminAddDialog';
import { GuestAddDialog } from 'common/components/ui/_dialogs/GuestAddDialog/GuestAddDialog';
import { useQuery } from 'common/hooks/useQuery';

import { AdminsInviteModal } from './_modals/AdminsInviteModal/AdminsInviteModal';
import { CommentsModal } from './_modals/CommentsModal/CommentsModal';
import { DirectionsModal } from './_modals/DirectionsModal/DirectionsModal';
import { GuestsInviteModal } from './_modals/GuestsInviteModal/GuestsInviteModal';
import { HistoryModal } from './_modals/HistoryModal/HistoryModal';
import { InstructionModal } from './_modals/InstructionModal/InstructionModal';
import { PhoneModal } from './_modals/PhoneModal/PhoneModal';

export interface ModalManagerProps {}

export enum ModalManagerNames {
  PHONES = 'phones',
  DIRECTIONS = 'directions',
  HISTORY = 'history',
  COMMENTS = 'comments',
  INSTRUCTIONS = 'instructions',
  INVITE_ADMINS = 'invite_admins',
  INVITE_GUESTS = 'invite_guests',
  ADD_GUEST = 'add_guest',
  ADD_ADMIN = 'add_admin'
}

export const ModalManager: React.FC<ModalManagerProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalManagerNames | null>(null);

  const query = useQuery();
  const queryModalType = query.get('modalType');

  const history = useHistory();

  useEffect(() => {
    if (Object.values(ModalManagerNames).includes(queryModalType as ModalManagerNames)) {
      setActiveModal(queryModalType as ModalManagerNames);
    } else {
      setActiveModal(null);
    }
  }, [queryModalType]);

  const handleModalClose = () => {
    query.delete('modalType');

    history.push({ search: query.toString() });
  };

  const renderCurrentModal = () => {
    if (activeModal === ModalManagerNames.PHONES) {
      return <PhoneModal onClose={handleModalClose} />;
    }

    if (activeModal === ModalManagerNames.DIRECTIONS) {
      return <DirectionsModal onClose={handleModalClose} />;
    }

    if (activeModal === ModalManagerNames.HISTORY) {
      return <HistoryModal onClose={handleModalClose} />;
    }

    if (activeModal === ModalManagerNames.COMMENTS) {
      return <CommentsModal onClose={handleModalClose} />;
    }

    if (activeModal === ModalManagerNames.INSTRUCTIONS) {
      return <InstructionModal onClose={handleModalClose} />;
    }

    if (activeModal === ModalManagerNames.INVITE_ADMINS) {
      return <AdminsInviteModal onClose={handleModalClose} />;
    }

    if (activeModal === ModalManagerNames.INVITE_GUESTS) {
      return <GuestsInviteModal onClose={handleModalClose} />;
    }

    if (activeModal === ModalManagerNames.ADD_GUEST) {
      return <GuestAddDialog isOpen onClose={handleModalClose} />;
    }

    if (activeModal === ModalManagerNames.ADD_ADMIN) {
      return <AdminAddDialog isOpen onClose={handleModalClose} />;
    }

    return null;
  };

  return (
    <>
      {renderCurrentModal()}

      {children}
    </>
  );
};
