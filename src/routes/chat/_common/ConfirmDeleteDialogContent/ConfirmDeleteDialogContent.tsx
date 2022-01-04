import React from 'react';

import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './ConfirmDeleteDialogContent.module.scss';

export interface IConfirmDeleteDialogContentProps {
  cancelBtnText: string;
  isOpen: boolean;
  message: string;
  onClickCancelBtn?: () => void;
  onClickSaveBtn?: () => void;
  onClose?: () => void;
  saveBtnText: string;
  title?: string;
}

export const ConfirmDeleteDialogContent: React.FC<IConfirmDeleteDialogContentProps> = (props) => {
  const { cancelBtnText, isOpen, message, onClickCancelBtn, onClickSaveBtn, onClose, saveBtnText, title } = props;

  const handleClose = () => onClose?.();

  return (
    <Dialog
      cancelBtnText={cancelBtnText}
      cancelClassName={s.ConfirmStopDialog__btn_cancel}
      childrenWrapperClassName={s.ConfirmStopDialog__container}
      disableOverflowControl
      footerClassName={s.ConfirmStopDialog__footer}
      headerClassName={s.ConfirmStopDialog__header}
      isOpen={isOpen}
      newDesign
      onClickCancelBtn={onClickCancelBtn}
      onClickSaveBtn={onClickSaveBtn}
      onClose={handleClose}
      saveBtnText={saveBtnText}
      saveClassName={s.ConfirmStopDialog__btn_save}
    >
      <div className={s.ConfirmDeleteDialog__container}>
        {title && <Text className={s.ConfirmDeleteDialog__title} text={title} variant={TextPropsVariantsEnum.BODY_L} />}

        {message && (
          <Text
            className={s.ConfirmDeleteDialog__text}
            color="textSecondary"
            text={message}
            variant={TextPropsVariantsEnum.BODY_L}
          />
        )}
      </div>
    </Dialog>
  );
};
