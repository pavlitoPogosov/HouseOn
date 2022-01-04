import React from 'react';

import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { AccountType } from 'graphql/types';

import { GuestsAddDialogContent } from '../GuestAddDialogContent/GuestAddDialogContent';

export interface GuestAddDialogProps {
  isOpen: boolean;
  accountToEdit?: AccountType | null;
  onClose: () => void;
}

export const GuestAddDialog: React.FC<GuestAddDialogProps> = ({ isOpen, onClose, accountToEdit }) => {
  return (
    <Dialog
      isOpen={isOpen}
      icon={ColorfulIconTypes.GUEST_SETTINGS}
      title={accountToEdit ? 'Edit guest' : 'Add new guest'}
      onClose={onClose}>
      <GuestsAddDialogContent accountToEdit={accountToEdit} onCancel={onClose} onCreated={onClose} onEdited={onClose} />
    </Dialog>
  );
};
