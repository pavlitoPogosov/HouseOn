import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { setUserChatsLanguage, setUserLanguage } from 'redux/slices/userSlice';
import { EChatLanguagesTypes } from 'routes/chat/types';
import { LOCAL_STORAGE_LANGUAGE_CHATS_PARAM, LOCAL_STORAGE_LANGUAGE_PARAM } from 'utils/localStorageKeys';

export const findLocaleInApp = (locale: string, defaultLocale = EChatLanguagesTypes.EN): EChatLanguagesTypes =>
  Object.values(EChatLanguagesTypes).find((l) => locale.split('-')[0].toLowerCase().includes(l)) || defaultLocale;

const detectLanguageByParam = (param: string, defaultLocale?: EChatLanguagesTypes): EChatLanguagesTypes => {
  if (typeof window === 'object') {
    const localeInStorage = localStorage.getItem(param);

    if (localeInStorage) {
      return localeInStorage as EChatLanguagesTypes;
    }

    const locale = navigator?.language;
    const localeInApp = findLocaleInApp(locale);

    if (locale && localeInApp) {
      localStorage.setItem(param, localeInApp);
      return localeInApp;
    }

    localStorage.setItem(param, defaultLocale || EChatLanguagesTypes.EN);
  }

  return defaultLocale || EChatLanguagesTypes.EN;
};

export const useLocale = () => {
  const dispatch = useTypedDispatch();

  const updateAppLocale = (locale: EChatLanguagesTypes): void => {
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_PARAM, locale);
    dispatch(setUserLanguage(locale));
  };

  const detectAppLanguage = () => {
    const locale = detectLanguageByParam(LOCAL_STORAGE_LANGUAGE_PARAM);
    updateAppLocale(locale);
    return locale;
  };

  const updateChatsLocale = (locale: EChatLanguagesTypes): void => {
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_CHATS_PARAM, locale);
    dispatch(setUserChatsLanguage(locale));
  };

  const detectChatsLanguage = (l: EChatLanguagesTypes) => {
    const locale = detectLanguageByParam(LOCAL_STORAGE_LANGUAGE_PARAM, l);
    updateChatsLocale(locale);
  };

  const initializeAppLocale = () => {
    const locale = detectAppLanguage();
    detectChatsLanguage(locale);
  };

  return {
    detectAppLanguage,
    detectChatsLanguage,
    initializeAppLocale,
    updateAppLocale,
    updateChatsLocale
  };
};
