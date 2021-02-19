import ReactNative from 'react-native';


// export default I18n;
//import memoize from "lodash.memoize";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import { I18nManager } from "react-native";

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("../Locales/en.json"),
  ar: () => require("../Locales/ar.json"),
  nl: () => require('../Locales/nl.json'),
  th: () => require("../Locales/th.json"),
  ja: () => require('../Locales/ja.json')
};

export function translate(name, params = {}) {
  return i18n.t(name, params);
};

export const setI18nConfig = (appLanguage) => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  console.log("language", appLanguage)
  const translations =
    appLanguage
      ? [appLanguage]
      : Object.keys(translationGetters);


  const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(translations) || fallback;
  console.log("lang", isRTL, languageTag)
  // clear translation cache
  ///translate.cache.clear!();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config

  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;

};

export default { setI18nConfig, translate };
