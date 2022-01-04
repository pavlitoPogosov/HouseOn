import { useCallback, useEffect, useRef } from 'react';

import { apiAuthUrl, isProduction } from 'config';

import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { handleSocialAuthAC } from 'redux/slices/authSlice/actionCreators';

export enum OAuthTypesEnum {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  LINKEDIN = 'linkedin'
}

const buildOAuthUrl = (oAuthType: OAuthTypesEnum) => {
  const windowOriginQuery = !isProduction() ? `?origin=${window.origin}` : '';

  return apiAuthUrl + `/${oAuthType}/` + windowOriginQuery;
};

export const useOAuth = () => {
  const dispatch = useTypedDispatch();
  const popupRef = useRef<Window | null>(null);

  const handleSocialAuth = useCallback(async (e) => {
    popupRef.current?.close();

    if (!(e && e.data && e.data.type === 'refreshToken')) {
      return;
    }

    await dispatch(handleSocialAuthAC(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerMessageHandler = useCallback(() => {
    window.addEventListener('message', handleSocialAuth);
  }, [handleSocialAuth]);

  const removeMessageHandler = useCallback(() => {
    window.removeEventListener('message', handleSocialAuth);
  }, [handleSocialAuth]);

  const handleStartOAuth = (oAuthType: OAuthTypesEnum) => {
    const popup = window.open(buildOAuthUrl(oAuthType), 'Authentication', 'width=800,height=600');

    popupRef.current = popup;
    registerMessageHandler();
  };

  useEffect(() => {
    return () => {
      removeMessageHandler();
    };
  }, [removeMessageHandler]);

  return {
    handleStartOAuth
  };
};
