import axios from 'axios';

const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';
const DEEPL_API_KEY = '63c18f26-8af1-4d34-8061-822da5cc0a48:fx';

interface TranslationResponse {
  translations: {
    detected_source_language: string;
    text: string;
  }[];
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
export async function translateText(options: TranslationOptions): Promise<undefined> {
  const { text, targetLang, sourceLang } = options;
  const params = new URLSearchParams({
    'target_lang': targetLang,
    'text': text
  });
  console.log(params.toString());
  

  try {
    // const response = await axios.post<TranslationResponse>(
    //   DEEPL_API_URL,
    //   new URLSearchParams({
    //     text,
    //     target_lang: targetLang,
    //     ...(sourceLang ? { source_lang: sourceLang } : {}), // Опционально указываем язык оригинала
    //   }),
    //   {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
    //     },
    //   }
    // );

    const resp = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      },
      body: JSON.stringify(params),
    }).then(r => r.json())
      .then((response: { translations: { detected_source_language: string; text: string;}[]}) => response.translations.map((translation) => translation.text).join(' '))
      .catch(error => {
        console.error(error);
        return 'Could not translate';
      });

    console.log(resp);
    

    // const translatedText = response.data.translations[0].text;
    // return translatedText;
  } catch (error) {
    console.error('Ошибка при переводе текста:', error);
    throw new Error('Не удалось выполнить перевод');
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