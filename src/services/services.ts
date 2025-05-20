import { translateText } from "../api";
import { 
  getAllWords, 
  updateAdditionalWordsByIds, 
  updateMainWordsByIds, 
  updateNativeWordsByIds
} from "../database"
import { store } from "../store";
import { LanguagesType, UILanguagesType } from "../types";

const translateListOfWords = async (targetLanguage: LanguagesType | UILanguagesType) => {
  const sourceLanguage = store.getState().appSettings.nativeLanguage;
  const allWords = await getAllWords("date_asc");
  const newWords = await Promise.all(allWords.map(async (word) => {
    const resp = await translateText({ 
      text: word.native_translation, 
      targetLang: targetLanguage, 
      sourceLang: sourceLanguage 
    });
    return {
      id: word.id,
      word: resp.translations[0].text,
    };
  }));
  return newWords;
}

export const changeAllMainWords = async (newLanguage: LanguagesType) => {
  const newListOfWords = await translateListOfWords(newLanguage);
  await updateMainWordsByIds(newListOfWords);
};

export const changeAllAdditionalWords = async (newLanguage: LanguagesType) => {
  const newListOfWords = await translateListOfWords(newLanguage);
  await updateAdditionalWordsByIds(newListOfWords);
};

export const changeAllNativeWords = async (newLanguage: UILanguagesType) => {
  const newListOfWords = await translateListOfWords(newLanguage);
  await updateNativeWordsByIds(newListOfWords);
}
