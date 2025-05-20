import { 
  DenamrkIcon,
  UkIcon,
  FinlandIcon,
  SwedenIcon,
  NorwayIcon,
  PlanetIcon
} from "../components";
import i18n from "../locales/i18n";
import { 
  ListOfLanguagesItemType, 
  ListOfLanguagesType 
} from "../types";

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