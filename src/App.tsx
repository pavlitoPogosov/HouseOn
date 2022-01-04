import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import AppRoutes from 'routes';

import { LoadingScreen } from 'common/components/ui/LoadingScreen/LoadingScreen';
import { ToastManager } from 'common/components/ui/ToastManager/ToastManager';
import { ScrollTopOnRouteChange } from 'common/components/utils/ScrollTopOnRouteChange';
import { useLocale } from 'common/hooks/useLocale';
import { useWatchProtectedRoutes } from 'common/hooks/useWatchProtectedRoutes';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { loadInitialDataAC } from 'redux/slices/authSlice/actionCreators';
import { EChatLanguagesTypes } from 'routes/chat/types';

export const App = () => {
  const { auth, user } = useTypedSelector((s) => s);
  const { isInitiallyLoaded } = auth;

  const dispatch = useTypedDispatch();
  const { initializeAppLocale } = useLocale();

  useWatchProtectedRoutes();

  useEffect(() => {
    dispatch(loadInitialDataAC());
    initializeAppLocale();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitiallyLoaded) {
    return <LoadingScreen />;
  }

  return (
    <IntlProvider locale={EChatLanguagesTypes.EN}>
      <ToastManager />
      <AppRoutes />
      <ScrollTopOnRouteChange />

      {/* TODO переименовать иконки в соответствии с фигмой, чтобы легче было искать */}
      {/* TODO переименовать design токены цветов, привести все в порядок */}
    </IntlProvider>
  );
};
