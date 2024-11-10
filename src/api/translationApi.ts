// const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';
// const DEEPL_API_KEY = '63c18f26-8af1-4d34-8061-822da5cc0a48:fx';

interface TranslationResponse {
  alternatives: string[];
  translatedText: string;
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
export async function translateText(options: TranslationOptions): Promise<TranslationResponse | { error: "Slowdown: 5 per 1 minute" }> {
  const { text, targetLang, sourceLang } = options;
  
  try {
    const res = await fetch("https://trans.zillyhuhn.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
        alternatives: 5,
        api_key: ""
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

/**
 * Функция для перевода текста с одного языка на другой
 * @param text Текст для перевода
 * @param target Язык, на который нужно перевести (например, 'RU' или 'EN')
 * @param source Исходный язык (необязательно, если требуется автоопределение)
 * @returns Переведенный текст
 */
export async function translateAdditionalText(options: TranslationOptions): Promise<TranslationResponse> {
  const { text, targetLang, sourceLang } = options;
  
  try {
    const res = await fetch("https://trans.zillyhuhn.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
        alternatives: 5,
        api_key: ""
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

/**
 * Функция для получения списка доступных языков перевода
 * @returns Список языков
 */
// export const getAvailableLanguages = async (): Promise<string[]> => {
//   try {
//     const response = await axios.get(`${apiUrl}/languages`, {
//       params: { auth_key: apiKey },
//     });
    
//     const languages = response.data.map((lang: any) => lang.language);
    
//     return languages;
//   } catch (error) {
//     throw new Error(`Error fetching languages: ${error}`);
//   }
// };