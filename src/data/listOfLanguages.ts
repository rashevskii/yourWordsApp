import { FC } from "react";
import { 
  DenamrkIcon,
  UkIcon,
  FinlandIcon,
  SwedenIcon,
  NorwayIcon,
  PlanetIcon
} from "../components";
import i18n from "../locales/i18n";

export type LanguagesType = "en" | "sv" | "fi" | "da" | "nb" | "mock";
export type EmgNamesType = "English" | "Norwegian" | "Swedish" | "Danish" | "Finnish" | "Has no value";
export type ListOfLanguagesType = Array<ListOfLanguagesItemType>;
export type ListOfLanguagesItemType = {
  key: LanguagesType;
  icon: FC;
  engName: EmgNamesType;
  translatedName: string;
};

export const listOfLanguages: ListOfLanguagesType = [
  {
    key: "en",
    icon: UkIcon,
    engName: "English",
    translatedName: i18n.t("English")
  },
  {
    key: "nb",
    icon: NorwayIcon,
    engName: "Norwegian",
    translatedName: i18n.t("Norwegian")
  },
  {
    key: "sv",
    icon: SwedenIcon,
    engName: "Swedish",
    translatedName: i18n.t("Swedish")
  },
  {
    key: "da",
    icon: DenamrkIcon,
    engName: "Danish",
    translatedName: i18n.t("Danish")
  },
  {
    key: "fi",
    icon: FinlandIcon,
    engName: "Finnish",
    translatedName: i18n.t("Finnish")
  },
];

export const mockLanguage: ListOfLanguagesItemType = {
  key: "mock",
  icon: PlanetIcon,
  engName: "Has no value",
  translatedName: i18n.t("Empty value")
}