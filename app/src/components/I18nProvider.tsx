"use client";

import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import appEn from "../../packages/i18n/locales/en/app.json";
import commonEn from "../../packages/i18n/locales/en/common.json";
import appRu from "../../packages/i18n/locales/ru/app.json";
import commonRu from "../../packages/i18n/locales/ru/common.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { app: appEn, common: commonEn },
        ru: { app: appRu, common: commonRu },
      },
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      detection: {
        order: ["querystring", "localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
