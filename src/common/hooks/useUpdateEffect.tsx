import { DependencyList, useEffect, useRef } from 'react';

const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(function setIsMounted() {
    isMounted.current = true;

    return function cleanupSetIsMounted() {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export const useUpdateEffect = (effect: any, dependencies: DependencyList | undefined) => {
  const isMounted = useIsMounted();
  const isInitialMount = useRef(true);

  useEffect(() => {
    let effectCleanupFunc = () => ({});

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCleanupFunc = effect() || effectCleanupFunc;
    }
    return () => {
      effectCleanupFunc();

      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (!isMounted.current) {
        isInitialMount.current = true;
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
