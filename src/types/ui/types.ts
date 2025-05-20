import { FC } from "react";
import { FolderDBResponse } from "../database";

export type SelectItem<T> = {
  label: string,
  value: T
}
export type SelectItems<T> = SelectItem<T>[];

export type FolderType = FolderDBResponse & {
  count: number;
}

export type FoldersType = FolderType[];

export type LanguagesType = "en" | "sv" | "fi" | "da" | "nb" | "mock";
export type EmgNamesType = "English" | "Norwegian" | "Swedish" | "Danish" | "Finnish" | "Has no value";
export type ListOfLanguagesType = Array<ListOfLanguagesItemType>;
export type ListOfLanguagesItemType = {
  key: LanguagesType;
  icon: FC;
  engName: EmgNamesType;
  translatedName: string;
};

export type UILanguagesType = "ru" | "uk" | "en";
export type ListOfUILanguagesType = Array<ListOfUILanguagesItemType>;
export type ListOfUILanguagesItemType = {
  key: UILanguagesType;
  icon: FC;
  engName: string;
  translatedName: string;
}