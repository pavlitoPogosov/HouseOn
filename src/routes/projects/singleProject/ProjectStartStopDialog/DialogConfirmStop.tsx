import React from 'react';
import { useIntl } from 'react-intl';

import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './DialogConfirmStop.module.scss';

type TDialogConfirmStop = {
  isOpen: boolean;
  onClickCancelBtn: () => void;
  onClickSaveBtn: () => void;
  onClose: () => void;
};

export const DialogConfirmStop = (props: TDialogConfirmStop): JSX.Element => {
  const { isOpen, onClickCancelBtn, onClickSaveBtn, onClose } = props;

  const intl = useIntl();

  const cancelBtnText = intl.formatMessage({
    defaultMessage: 'Cancel',
    id: 'project.modal.confirm.stop.cancel'
  });

  const saveBtnText = intl.formatMessage({
    defaultMessage: 'Yes, stop the project',
    id: 'project.modal.confirm.stop.confirm'
  });

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
      onClose={onClose}
      saveBtnText={saveBtnText}
      saveClassName={s.ConfirmStopDialog__btn_save}>
      <div className={s.DialogConfirmStop__container}>
        <Text
          className={s.DialogConfirmStop__title}
          text={intl.formatMessage({
            defaultMessage: 'All active tasks will be stopped',
            id: 'project.modal.confirm.stop.title'
          })}
          variant={TextPropsVariantsEnum.BODY_L}
        />

        <Text
          className={s.DialogConfirmStop__text}
          color="textSecondary"
          text={intl.formatMessage({
            defaultMessage:
              'When you stop a project, all tasks are stopped.\n Are you sure you want to stop proccess and remove tasks from the task list?',
            id: 'project.modal.confirm.stop.text'
          })}
          variant={TextPropsVariantsEnum.BODY_L}
        />
      </div>
    </Dialog>
  );
};
