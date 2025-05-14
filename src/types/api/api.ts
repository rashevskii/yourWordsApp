export interface TranslationResponse {
  translations: Translation[];
}

export type Translation = {
  detected_source_language: string;
  text: string;
}

export interface TranslationOptions {
  text: string;
  targetLang: string;
  sourceLang?: string;
}
