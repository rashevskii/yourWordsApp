import { FolderDBResponse } from "../database";

export type SelectItem<T> = {
  label: string,
  value: T
}
export type SelectItems<T> = SelectItem<T>[];

export type LanguageItem = "en" | "se" | "fi" | "dk" | "no" | "ru" | "uk" | null;

export type FolderType = FolderDBResponse & {
  count: number;
}

export type FoldersType = FolderType[];