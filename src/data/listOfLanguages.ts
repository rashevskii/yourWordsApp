import { FC } from "react";
import { 
  DenamrkIcon,
  UkIcon,
  FinlandIcon,
  SwedenIcon,
  NorwayIcon
} from "../components";
import i18n from "../locales/i18n";

export type LanguagesType = "en" | "se" | "fi" | "dk" | "no";
export type ListOfLanguagesType = Array<ListOfLanguagesItemType>;
export type ListOfLanguagesItemType = {
  key: "en" | "se" | "fi" | "dk" | "no";
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
    key: "no",
    icon: NorwayIcon,
    engName: "Norwegian",
    translatedName: i18n.t("Norwegian")
  },
  {
    key: "se",
    icon: SwedenIcon,
    engName: "Swedish",
    translatedName: i18n.t("Swedish")
  },
  {
    key: "dk",
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