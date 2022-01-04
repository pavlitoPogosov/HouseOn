import { differenceInSeconds } from 'date-fns';
import { isNull } from 'lodash';
import moment from 'moment';

import { ReduxActionCreator } from 'redux/store';
import { LOCAL_STORAGE_SEND_CODE_AGAIN_PHONE, LOCAL_STORAGE_KEY_SEND_CODE_AGAIN_DATE } from 'utils/localStorageKeys';

import sendCodeAgainActions from './index';

interface IsAbleToSetCodeAgainCooldownACProps {
  phone: string;
}

export const isAbleToSetCodeAgainCooldownAC: ReduxActionCreator<IsAbleToSetCodeAgainCooldownACProps, boolean> = ({
  phone
}) => {
  return async () => {
    const prevDate = localStorage.getItem(LOCAL_STORAGE_KEY_SEND_CODE_AGAIN_DATE);
    const prevPhone = localStorage.getItem(LOCAL_STORAGE_SEND_CODE_AGAIN_PHONE);

    const isDateValid = moment(prevDate).isValid() && moment(prevDate).isAfter(moment());
    const isNewPhone = phone !== prevPhone;

    if (isDateValid && !isNewPhone) {
      return false;
    }

    return true;
  };
};

interface SetSendCodeAgainCooldownACProps {
  phone: string;
  seconds: number;
}

export const setSendCodeAgainCooldownAC: ReduxActionCreator<SetSendCodeAgainCooldownACProps> = ({ phone, seconds }) => {
  return async (dispatch) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SEND_CODE_AGAIN_DATE, moment().add(seconds, 'seconds').toISOString());
    localStorage.setItem(LOCAL_STORAGE_SEND_CODE_AGAIN_PHONE, phone);

    dispatch(sendCodeAgainActions.setCooldown(seconds));
  };
};

export const removeSendCodeAgainCooldownAC: ReduxActionCreator = () => {
  return async (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_SEND_CODE_AGAIN_DATE);
    localStorage.removeItem(LOCAL_STORAGE_SEND_CODE_AGAIN_PHONE);

    dispatch(sendCodeAgainActions.setCooldown(null));
  };
};

export const initialSendCodeAgainCheckAC: ReduxActionCreator = () => {
  return async (dispatch) => {
    const prevDate = localStorage.getItem(LOCAL_STORAGE_KEY_SEND_CODE_AGAIN_DATE);
    const isDateValid = moment(prevDate).isValid() && moment(prevDate).isAfter(moment());

    if (isDateValid) {
      dispatch(sendCodeAgainActions.setCooldown(differenceInSeconds(moment(prevDate).toDate(), moment().toDate())));
    } else {
      dispatch(removeSendCodeAgainCooldownAC());
    }
  };
};

export const decrementSendCodeAgainCooldownAC: ReduxActionCreator = () => {
  return async (dispatch, getState) => {
    const { cooldown } = getState().sendCodeAgain;

    if (isNull(cooldown) || cooldown < 0) {
      dispatch(removeSendCodeAgainCooldownAC());
      return;
    }

    dispatch(sendCodeAgainActions.setCooldown(cooldown - 1));
  };
};
