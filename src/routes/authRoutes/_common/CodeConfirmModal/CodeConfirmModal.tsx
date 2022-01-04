import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { CodeInput, CodeInputRef } from 'common/components/ui/CodeInput/CodeInput';
import { Overlay } from 'common/components/ui/Overlay/Overlay';
import { SendCodeAgain } from 'common/components/ui/SendCodeAgain/SendCodeAgain';
import { Spinner } from 'common/components/ui/Spinner/Spinner';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import authActions from 'redux/slices/authSlice';
import { sendSMSCodeAC, verifySMSCodeAC } from 'redux/slices/authSlice/actionCreators';
import { getPhoneWithoutMask } from 'utils/formValidation/stringUtils';

import s from './CodeConfirmModal.module.scss';

export interface CodeConfirmModalProps {
  isOpen: boolean;
  isLoading: boolean;
  phone: string;
  error: string | null;
  onClose: () => void;
}

export const CodeConfirmModal: React.FC<CodeConfirmModalProps> = ({ isOpen, isLoading, phone, error, onClose }) => {
  const dispatch = useTypedDispatch();
  const codeInputRef = useRef<CodeInputRef | null>(null);

  const intl = useIntl();

  const handleClose = () => {
    dispatch(authActions.setCodeConfirmError(null));
    onClose();
  };

  const handleEditNumber = () => {
    (document.forms[0][0] as HTMLInputElement)?.focus();
    onClose();
  };

  const handleSendCodeAgain = () => {
    dispatch(sendSMSCodeAC({ phone: getPhoneWithoutMask(phone) }));
  };

  const handleCodeComplete = async (code: string) => {
    const wasValid = await dispatch(verifySMSCodeAC({ code, phone: getPhoneWithoutMask(phone) }));

    if (!wasValid) {
      codeInputRef.current?.focus();
    }
  };

  return (
    <Overlay
      isOpen={isOpen}
      onClose={handleClose}
      childrenWrapperClassName={s.CodeConfirmModal__content}
      disableClose={isLoading}>
      <div className={s.CodeConfirmModal__closeWrapper}>
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>

      <Text
        variant={TextPropsVariantsEnum.H2}
        as="h3"
        text={intl.formatMessage({ id: 'auth.confirmPhone', defaultMessage: 'Confirm phone' })}
      />

      <div className={s.CodeConfirmModal__phone}>
        <FormattedMessage
          id="auth.sentVerificationCode"
          defaultMessage="We sent a verification code to"
          description="Notification of sending a code to the phone"
        />
        <br />
        &nbsp;
        <span>{phone}</span>
      </div>

      <div className={s.CodeConfirmModal__editBtn} onClick={handleEditNumber}>
        <FormattedMessage
          id="auth.editNumberButton"
          defaultMessage="Edit number"
          description="Button for edit number"
        />
      </div>

      <CodeInput disabled={isLoading} error={error} onComplete={handleCodeComplete} ref={codeInputRef} />

      <div className={s.CodeConfirmModal__sendAgain}>
        <SendCodeAgain onSendAgain={!isLoading ? handleSendCodeAgain : undefined} />
        {isLoading && <Spinner size="sm" className={s.CodeConfirmModal__spinner} />}
      </div>
    </Overlay>
  );
};
