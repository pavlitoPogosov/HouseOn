import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { appHistory } from 'appHistory';
import clsx from 'clsx';

import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import toastActions from 'redux/slices/toastSlice';

import { Toast } from './Toast/Toast';

import s from './ToastManager.module.scss';

export interface ToastManagerProps {}

export const ToastManager: React.FC<ToastManagerProps> = () => {
  const { activeToasts, previousPathname } = useTypedSelector((s) => s.toast);
  const dispatch = useTypedDispatch();

  const handleToastDestroy = (id: string) => {
    return () => {
      dispatch(toastActions.deleteToast(id));
    };
  };

  useEffect(() => {
    const unlisten = appHistory.listen((location) => {
      if (previousPathname !== location.pathname) {
        dispatch(toastActions.setPreviousPathname(location.pathname));
      }
    });

    return unlisten;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousPathname]);

  return ReactDOM.createPortal(
    <div className={clsx(s.ToastManager__Container, s.ToastManager__ContainerLeft)}>
      {activeToasts.map((t) => (
        <Toast key={t.id} toast={t} onDestroyed={handleToastDestroy(t.id)} previousPathname={previousPathname} />
      ))}
    </div>,
    document.body
  );
};
