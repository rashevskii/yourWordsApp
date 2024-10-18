export type SelectItem<T> = {
  label: string,
  value: T
}
export type SelectItems<T> = SelectItem<T>[];

export type LanguageItem = "en" | "se" | "fi" | "dk" | "no" | "ru" | "uk" | null;