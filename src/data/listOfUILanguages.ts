import { FC } from "react";
import { 
  UkraineIcon,
  UkIcon,
  RussiaIcon,
  PlanetIcon
} from "../components";
import i18n from "../locales/i18n";
import { 
  ListOfUILanguagesItemType, 
  ListOfUILanguagesType 
} from "../types";

export const listOfUILanguages: ListOfUILanguagesType = [
  {
    key: "en",
    icon: UkIcon,
    engName: "English",
    translatedName: i18n.t("English")
  },
  {
    key: "uk",
    icon: UkraineIcon,
    engName: "Ukrainian",
    translatedName: i18n.t("Ukrainian")
  },
  {
    key: "ru",
    icon: RussiaIcon,
    engName: "Russian",
    translatedName: i18n.t("Russian")
  }
];

export const mockUILanguage: ListOfUILanguagesItemType = {
  key: "en",
  icon: PlanetIcon,
  engName: "Has no value",
  translatedName: i18n.t("Empty value")
}