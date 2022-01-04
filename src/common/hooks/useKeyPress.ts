import { useEffect, useCallback } from 'react';

type TUseKeyPressOptions = {
  handler: () => void;
  targetKey: KeyboardEvent['key'];
};

export const useKeyPress = (props: TUseKeyPressOptions): void => {
  const { handler, targetKey } = props;

  const downHandler = useCallback(
    ({ key }) => {
      if (key.toLowerCase() === targetKey.toLowerCase()) {
        handler();
      }
    },
    [targetKey]
  );

  useEffect(() => {
    if (typeof window !== 'object') {
      return;
    }

    window.addEventListener('keydown', downHandler);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [downHandler]);
};
