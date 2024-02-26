import dayjs from 'dayjs';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as locales from '@/assets/locales';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE_KEY } from '@/helpers/constants';
import { isBrowser } from '@/helpers/ssr';

const setHtmlProperties = (lang: string) => {
  const language = AVAILABLE_LANGUAGES.find(({ key }) => key === lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = language?.dir ?? 'ltr';
  document.documentElement.style.fontSize = `${(language?.fontScale ?? 1) * 100}%`;
};

i18n.use(initReactI18next).init({
  defaultNS: 'common',
  ns: Object.keys((locales as ExplicitAny)[DEFAULT_LANGUAGE_KEY]),
  resources: locales,
  lng: DEFAULT_LANGUAGE_KEY,
  fallbackLng: DEFAULT_LANGUAGE_KEY,

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

i18n.on('languageChanged', lang => {
  dayjs.locale(lang);
  if (isBrowser) {
    setHtmlProperties(lang?.toLowerCase());
  }
});
