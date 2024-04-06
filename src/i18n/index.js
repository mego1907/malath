import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEn from './locales/en/translation.json';
import translationAr from './locales/ar/translation.json';

export const resources = {
  en: {
    translations: translationEn,
  },
  ar: {
    translations: translationAr,
  },
};
i18n
.use(initReactI18next)
.use(LanguageDetector)
.init({
  supportedLngs: ["en", "ar"],
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  resources,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["path", "localStorage", "htmlTag"],
    caches: ["localStorage"],
  },
  keySeparator: false,
  react: { useSuspense: true },
  });

  export default i18n;