import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export function createI18n(resources: Record<string, object>) {
  if (i18n.isInitialized) return i18n;

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      detection: {
        order: ["querystring", "localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });

  return i18n;
}

export { i18n };
