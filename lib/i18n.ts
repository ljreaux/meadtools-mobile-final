import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18nConfig from "../i18nConfig";

// Import local translation files
import enDefault from "../public/locales/en/default.json";
import enYeastTable from "../public/locales/en/YeastTable.json";
import deDefault from "../public/locales/de/default.json";
import deYeastTable from "../public/locales/de/YeastTable.json";

// Manually define translation resources
const resources = {
  en: {
    default: enDefault,
    YeastTable: enYeastTable,
  },
  de: {
    default: deDefault,
    YeastTable: deYeastTable,
  },
};

i18n.use(initReactI18next).init({
  lng: i18nConfig.defaultLocale,
  fallbackLng: i18nConfig.defaultLocale,
  supportedLngs: i18nConfig.locales,
  defaultNS: i18nConfig.defaultNS,
  ns: i18nConfig.ns,
  resources,

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },

  detection: {
    order: ["asyncStorage", "navigator"],
    caches: ["asyncStorage"],
    lookupAsyncStorage: "i18nextLng",
  },
});

i18n.on("languageChanged", (lng) => {
  AsyncStorage.setItem("i18nextLng", lng);
});

export default i18n;
