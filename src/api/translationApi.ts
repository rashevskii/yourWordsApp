// const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';
// const DEEPL_API_KEY = '63c18f26-8af1-4d34-8061-822da5cc0a48:fx';

interface TranslationResponse {
  translations: Translation[];
}

type Translation = {
  detected_source_language: string;
  text: string;
}

interface TranslationOptions {
  text: string;
  targetLang: string;
  sourceLang?: string;
}

/**
 * Функция для перевода текста с одного языка на другой
 * @param text Текст для перевода
 * @param target Язык, на который нужно перевести (например, 'RU' или 'EN')
 * @param source Исходный язык (необязательно, если требуется автоопределение)
 * @returns Переведенный текст
 */
export async function translateText(options: TranslationOptions): Promise<TranslationResponse> {
  const { text, targetLang,sourceLang } = options;
  
  try {
    const res = await fetch("https://your-words-server.onrender.com/translate", {
      method: "POST",
      body: JSON.stringify({
        text,
        sourceLang,
        targetLang
      }),
      headers: { "Content-Type": "application/json" }
    });

    const translations = res.json();

    return translations;
  } catch (error) {
    console.error('Ошибка при переводе текста:', error);
    throw new Error(`Не удалось выполнить перевод: ${error}`);
  }
}
