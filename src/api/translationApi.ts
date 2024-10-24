import axios from 'axios';
import { LanguagesType } from '../data';

// Укажи свой API-ключ для DeepL
const apiKey = 'your-deepl-api-key'; 
const apiUrl = 'https://api-free.deepl.com/v2';

/**
 * Функция для перевода текста с одного языка на другой
 * @param text Текст для перевода
 * @param target Язык, на который нужно перевести (например, 'RU' или 'EN')
 * @param source Исходный язык (необязательно, если требуется автоопределение)
 * @returns Переведенный текст
 */
export const translateText = async (text: string, target: LanguagesType, source?: string): Promise<string> => {
  try {
    const params: any = {
      auth_key: apiKey,
      text,
      target_lang: target,
    };

    if (source) {
      params.source_lang = source;
    }

    const response = await axios.post(`${apiUrl}/translate`, new URLSearchParams(params));
    const translatedText = response.data.translations[0].text;
    
    return translatedText;
  } catch (error) {
    throw new Error(`Error translating text: ${error}`);
  }
};

/**
 * Функция для получения списка доступных языков перевода
 * @returns Список языков
 */
export const getAvailableLanguages = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${apiUrl}/languages`, {
      params: { auth_key: apiKey },
    });
    
    const languages = response.data.map((lang: any) => lang.language);
    
    return languages;
  } catch (error) {
    throw new Error(`Error fetching languages: ${error}`);
  }
};