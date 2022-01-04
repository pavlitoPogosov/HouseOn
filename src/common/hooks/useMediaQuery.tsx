import { useMemo, useState, useEffect } from 'react';

export const useMediaQuery = (mediaQueryString: string) => {
  const mediaQueryList = useMemo(() => {
    return window.matchMedia(`screen and ${mediaQueryString}`);
  }, [mediaQueryString]);

  const [queryResult, setQueryResult] = useState(mediaQueryList.matches);

  useEffect(() => {
    mediaQueryList.onchange = (e: MediaQueryListEvent) => setQueryResult(e.matches);
  }, [mediaQueryList]);

  return mediaQueryString ? queryResult : false;
};
