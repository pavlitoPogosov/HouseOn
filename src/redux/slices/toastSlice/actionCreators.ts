import { delayPromise } from '@proscom/ui-utils';
import toastActions, { IToast } from 'redux/slices/toastSlice';
import { ReduxActionCreator } from 'redux/store';

export const createToast: ReduxActionCreator<Omit<IToast, 'id'>> = (toast) => {
  return async (dispatch) => {
    const newToast = {
      ...toast,
      id: Date.now().toString()
    };

    if (newToast.appearTimeout) {
      await delayPromise(newToast.appearTimeout);
    }

    dispatch(toastActions.addToast(newToast));

    if (newToast.dismissTimeout) {
      setTimeout(() => {
        dispatch(toastActions.deleteToast(newToast.id));
      }, newToast.dismissTimeout);
    }
  };
};
