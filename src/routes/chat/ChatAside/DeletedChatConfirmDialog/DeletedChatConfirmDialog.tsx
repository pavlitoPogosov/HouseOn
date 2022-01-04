import React from 'react';
import { useIntl } from 'react-intl';

import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './DeletedChatConfirmDialog.module.scss';

export interface IDeletedChatConfirmDialogProps {
  isOpen: boolean;

  onClose: () => void;
  onConfirmDelete: () => void;
}

export const DeletedChatConfirmDialog: React.FC<IDeletedChatConfirmDialogProps> = (props) => {
  const { isOpen, onClose, onConfirmDelete } = props;

  const intl = useIntl();

  return (
    <Dialog
      cancelBtnText={intl.formatMessage({ defaultMessage: 'No, don’t remove', id: 'app.dialog.cancelRemove' })}
      isOpen={isOpen}
      onClickCancelBtn={onClose}
      onClickSaveBtn={onConfirmDelete}
      onClose={onClose}
      saveBtnText={intl.formatMessage({ defaultMessage: 'Yes, remove', id: 'app.dialog.remove' })}
    >
      <div className={s.DeletedChatConfirmDialog__container}>
        <div className={s.DeletedChatConfirmDialog__picture} />

        <Text
          className={s.DeletedChatConfirmDialog__message}
          text={intl.formatMessage(
            {
              defaultMessage: 'Are you sure you want to delete chat “{name}”?',
              id: 'chat.dialog.confirm.remove.text'
            },
            { name: 'Name. Сreated by admin' }
          )}
          variant={TextPropsVariantsEnum.H3}
        />
      </div>
    </Dialog>
  );
};
