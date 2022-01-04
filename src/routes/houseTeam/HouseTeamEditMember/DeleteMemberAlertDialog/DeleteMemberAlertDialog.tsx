import React from 'react';
import { useIntl } from 'react-intl';

import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './DeleteMemberAlertDialog.module.scss';

export interface DeleteMemberAlertDialogProps {
  isOpen: boolean;

  onClose: () => void;
  onRemovalConfirm: () => void;
}

export const DeleteMemberAlertDialog: React.FC<DeleteMemberAlertDialogProps> = ({
  isOpen,
  onClose,
  onRemovalConfirm
}) => {
  const intl = useIntl();

  return (
    <Dialog
      title="Attention"
      icon={ColorfulIconTypes.EXCLAMATION_POINT}
      isOpen={isOpen}
      onClose={onClose}
      cancelBtnText={intl.formatMessage({ id: 'app.cancel', defaultMessage: 'Cancel' })}
      saveBtnText={intl.formatMessage({ id: 'app.delete', defaultMessage: 'Delete' })}
      onClickCancelBtn={onRemovalConfirm}
      onClickSaveBtn={onClose}
      childrenWrapperClassName={s.DeleteMemberAlertDialog__container}>
      <div className={s.DeleteMemberAlertDialog__picture} />

      <Text
        variant={TextPropsVariantsEnum.H3}
        text={intl.formatMessage({
          id: 'houseTeam.modal.alert.notAllDelete',
          defaultMessage: 'Please, do not delete all of them'
        })}
        className={s.DeleteMemberAlertDialog__title}
      />

      <Text
        variant={TextPropsVariantsEnum.BODY_M}
        text={intl.formatMessage({
          id: 'houseTeam.modal.hint.notAllDelete',
          defaultMessage: 'There are often more ways to fix a problem than to fire everyone'
        })}
        color="textSecondary"
      />
    </Dialog>
  );
};
