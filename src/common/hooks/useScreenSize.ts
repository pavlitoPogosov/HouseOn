import { useCallback, useEffect, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

export const useScreenSize = () => {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      height: isClient ? window.innerWidth : 0,
      width: isClient ? window.innerHeight : 0
    };
  }, [isClient]);

  const [screenSize, setScreenSize] = useState(getSize);

  const { height = 0, width = 0 } = screenSize;

  const handleResize = useDebouncedCallback(() => {
    setScreenSize(getSize());
  }, 50);

  useEffect(() => {
    if (isClient) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    height,
    width
  };
};
