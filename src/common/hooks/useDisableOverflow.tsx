import { useEffect } from 'react';

export const useDisableOverflow = (isDisabled?: boolean, disableBehavior?: boolean) => {
  useEffect(() => {
    if (!disableBehavior) {
      document.body.style.overflowY = isDisabled ? 'hidden' : '';
    }

    return () => {
      if (!disableBehavior) {
        document.body.style.overflowY = '';
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled]);
};
