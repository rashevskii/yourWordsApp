import { FC } from "react";
import { 
  DenamrkIcon,
  UkIcon,
  FinlandIcon,
  SwedenIcon,
  NorwayIcon
} from "../components";
import i18n from "../locales/i18n";

export type LanguagesType = "en" | "sv" | "fi" | "da" | "nb";
export type ListOfLanguagesType = Array<ListOfLanguagesItemType>;
export type ListOfLanguagesItemType = {
  key: "en" | "sv" | "fi" | "da" | "nb";
  icon: FC;
  engName: string;
  translatedName: string;
}

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
]