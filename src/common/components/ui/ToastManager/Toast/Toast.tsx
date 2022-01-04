import React, { useEffect, useState } from 'react';

import { appHistory } from 'appHistory';
import cslx from 'clsx';
import { isNumber } from 'lodash';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as CloseIconSolid } from 'assets/icons/closeSolid.svg';
import { Slide } from 'common/components/ui/_animations/Slide/Slide';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import toastActions from 'redux/slices/toastSlice';
import { IToast } from 'redux/slices/toastSlice/index';

import s from './Toast.module.scss';

export interface ToastProps {
  toast: IToast;
  previousPathname: string;
  onDestroyed: () => void;
}

// TODO add close on swipe
export const Toast: React.FC<ToastProps> = ({ toast, previousPathname, onDestroyed }) => {
  const { disableManualDismiss, title, text, type = 'success', animationDuration = 240, renderContent } = toast;

  const dispatch = useTypedDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const unlisten = appHistory.listen((location) => {
      if (previousPathname !== location.pathname) {
        const newToast: IToast = {
          ...toast,
          preserveOnRouteChangeLimit: isNumber(toast.preserveOnRouteChangeLimit)
            ? toast.preserveOnRouteChangeLimit - 1
            : toast.preserveOnRouteChangeLimit
        };

        const shouldPreserveToast = isNumber(newToast.preserveOnRouteChangeLimit)
          ? newToast.preserveOnRouteChangeLimit >= 0
          : newToast.preserveOnRouteChangeLimit;

        if (!shouldPreserveToast) {
          handleClose();
        } else {
          dispatch(toastActions.replaceSingleToast(newToast));
        }
      }
    });

    return unlisten;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousPathname, toast]);

  const showThinIcon = useMediaQuery('(min-width: 576px)');

  return (
    <Slide
      className={cslx(
        s.Toast__container,
        {
          [s.Toast__success]: type === 'success',
          [s.Toast__error]: type === 'error'
        },
        toast.className
      )}
      useTransitionProps={{
        config: { duration: animationDuration },
        onDestroyed
      }}
      animation="left"
      isActive={isOpen}>
      {renderContent ? (
        renderContent({
          toast,
          onClose: handleClose
        })
      ) : (
        <>
          {!disableManualDismiss && (
            <button className={s.Toast__closeBtn} onClick={handleClose}>
              {showThinIcon ? <CloseIcon /> : <CloseIconSolid />}
            </button>
          )}

          {title && <Text variant={TextPropsVariantsEnum.BODY_L} text={title} className={s.Toast__title} />}

          <div className={s.Toast__text}>{text}</div>
        </>
      )}
    </Slide>
  );
};
