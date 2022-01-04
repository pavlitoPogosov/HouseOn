import React from 'react';

import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { AccountType } from 'graphql/types';

import { AdminAddDialogContent } from '../AdminAddDialogContent/AdminAddDialogContent';

export interface AdminAddDialogProps {
  accountToEdit?: AccountType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAddDialog: React.FC<AdminAddDialogProps> = ({ isOpen, onClose, accountToEdit }) => {
  return (
    <Dialog
      isOpen={isOpen}
      icon={ColorfulIconTypes.GUEST_SETTINGS}
      title={accountToEdit ? 'Edit guest' : 'Add new guest'}
      onClose={onClose}>
      <AdminAddDialogContent accountToEdit={accountToEdit} onCancel={onClose} onCreated={onClose} onEdited={onClose} />
    </Dialog>
  );
};
