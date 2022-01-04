import React from 'react';
import { useLocation } from 'react-router-dom';

import { useUpdateEffect } from 'common/hooks/useUpdateEffect';

export const ScrollTopOnRouteChange: React.FC<{}> = () => {
  const { pathname } = useLocation();

  useUpdateEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
