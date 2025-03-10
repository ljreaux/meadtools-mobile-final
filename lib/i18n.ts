import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18nConfig from "../i18nConfig";

const API_KEY = process.env.I18NEXUS_API_KEY;

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: i18nConfig.defaultLocale, // Default language
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales, // Supported languages
    defaultNS: i18nConfig.defaultNS,
    ns: i18nConfig.ns, // Namespace

    backend: {
      loadPath: `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${API_KEY}`,
    },

    interpolation: {
      escapeValue: false, // React Native does not require escaping
    },

    react: {
      useSuspense: false, // Prevents issues with async rendering
    },

    detection: {
      order: ["asyncStorage", "navigator"],
      caches: ["asyncStorage"],
      lookupAsyncStorage: "i18nextLng",
    },
  });

// Persist the selected language
i18n.on("languageChanged", (lng) => {
  AsyncStorage.setItem("i18nextLng", lng);
});

export default i18n;
