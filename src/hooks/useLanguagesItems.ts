import { store } from "../store"
import { LanguageItem, SelectItems } from "../types";

export const useLanguagesItems = (): SelectItems<LanguageItem[]> => {
  const { 
    appSettings: { 
      mainLanguage, 
      additionalLanguage, 
      nativeLanguage } 
  } = store.getState();
  const allLanguagesValue = [mainLanguage, additionalLanguage, nativeLanguage];
  const mainLanguagesValue = [mainLanguage, nativeLanguage];
  const additionalLanguagesValue = [additionalLanguage, nativeLanguage];
  const allLanguagesLabel = allLanguagesValue.join(" | ");
  const mainLanguagesLabel = allLanguagesValue.filter(lang => lang !== additionalLanguage).join(" | ");
  const additionalLanguagesLabel =  allLanguagesValue.filter(lang => lang !== mainLanguage).join(" | ");
  if (additionalLanguage) {
    return [
      { label: allLanguagesLabel, value: allLanguagesValue },
      { label: mainLanguagesLabel, value: mainLanguagesValue },
      { label: additionalLanguagesLabel, value: additionalLanguagesValue },
    ];
  } else {
    return [
      { label: mainLanguagesLabel , value: mainLanguagesValue }
    ];
  }
}