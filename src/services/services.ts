import { translateText } from "../api";
import { getAllWords, updateWordsById } from "../database"
import { store } from "../store";

export const changeAllWords = async (newLanguage: string) => {
  const sourceLanguage = store.getState().appSettings.nativeLanguage;
  const allWords = await getAllWords("date_asc");
  const newWords = await Promise.all(allWords.map(async (word) => {
    const resp = await translateText({ text: word.native_translation, targetLang: newLanguage, sourceLang: sourceLanguage });
    return {
      id: word.id,
      word: resp.translations[0].text,
    };
  }));
  await updateWordsById(newWords);
};
