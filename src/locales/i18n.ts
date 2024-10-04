import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translation.json';
import translationRU from './ru/translation.json';
import translationUK from "./uk/translation.json";
import { store } from '../store';

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  },
  uk: {
    translation: translationUK
  }
} as const;

export type Resources = typeof resources;

const getLanguage = (): string => {
  const state = store.getState();
  const language = state.appSettings.language;
  return language || "ru";
};

// Инициализация i18n
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: getLanguage(), // Язык по умолчанию
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // Не нужно экранировать в React Native
    }
  });

store.subscribe(() => {
  const state = store.getState();
  const language = state.appSettings.language;
  if (i18n.language !== language) {
    i18n.changeLanguage(language); // Меняем язык в i18next
  }
});

export default i18n;