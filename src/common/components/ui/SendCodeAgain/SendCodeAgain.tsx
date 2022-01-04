import React, { useEffect } from 'react';

import clsx from 'clsx';

import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import {
  decrementSendCodeAgainCooldownAC,
  initialSendCodeAgainCheckAC
} from 'redux/slices/sendCodeAgainSlice/actionCreators';

import s from './SendCodeAgain.module.scss';

export interface SendCodeAgainProps {
  onSendAgain?: () => void;
  containerClassName?: string;
}

export const SendCodeAgain: React.FC<SendCodeAgainProps> = ({ onSendAgain, containerClassName }) => {
  const { cooldown } = useTypedSelector((s) => s.sendCodeAgain);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    timeout = setTimeout(() => {
      dispatch(decrementSendCodeAgainCooldownAC());
    }, 1000);

    return () => {
      clearTimeout(timeout!);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cooldown]);

  useEffect(() => {
    dispatch(initialSendCodeAgainCheckAC());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx(s.SendCodeAgain__container, containerClassName)}>
      {cooldown ? (
        <div className={s.SendCodeAgain__resendNotification}>Resend after {cooldown}</div>
      ) : (
        <div className={s.SendCodeAgain__resendBtn} onClick={onSendAgain}>
          Send code again
        </div>
      )}
    </div>
  );
};
