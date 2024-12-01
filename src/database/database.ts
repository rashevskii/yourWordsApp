import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Toast } from 'react-native-toast-notifications';
import { FoldersDBResponse, WordsDBResponse } from '../types/database';
import i18n from '../locales/i18n';
import { dbEventEmitter, events } from '../events';

export type ISortTypeWords  = string & {
  orderBy: 'date_asc' | 'date_desc' | 'alphabet_asc' | 'alphabet_desc';
}

// Включаем режим отладки (по желанию)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return SQLite.openDatabase({ name: 'words.db', location: 'default' });
};

/**
 * Функция для создания таблиц в базе данных
 */
export const createTables = async (): Promise<void> => {
  const db = await getDBConnection();

  await db.transaction(tx => {
    // Создание таблицы для хранения слов
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_word TEXT NOT NULL,
        additional_translation TEXT,
        native_translation TEXT NOT NULL,
        group_id INTEGER,
        added_date TEXT NOT NULL,
        FOREIGN KEY (group_id) REFERENCES groups(id)
      );
    `,
    [],
    () => {},
    (_, error) => {
      console.error('Error fetching words: ', error);
      Toast.show(error.message);
    }
  );

    // Создание таблицы для групп
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_name TEXT NOT NULL,
        image_path TEXT
      );
      `,
      [],
      () => {},
      (_, error) => {
        console.error('Error fetching words: ', error);
        Toast.show(error.message);
      }
    );
  });

  db.close();
};

/**
 * Функция для добавления слова в таблицу words
 * @param original_word Оригинальное слово для перевода
 * @param native_translation Перевод на родной язык
 * @param additional_translation Перевод на дополнительный язык (необязательно)
 * @param group_id ID группы (если есть)
 * @param added_date Дата добавления (в формате строки)
 */
export const addWord = async (
  original_word: string,
  native_translation: string,
  additional_translation: string | null = null,
  group_id: string | null = null,
  added_date: string
): Promise<void> => {
  const db = await getDBConnection();
  await db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO words (original_word, native_translation, additional_translation, group_id, added_date) 
      VALUES (?, ?, ?, ?, ?);`,
      [original_word, native_translation, additional_translation, group_id, added_date],
      () => {
        Toast.show(i18n.t("Word added"));
        dbEventEmitter.emit(events.WORD_ADDED);
      },
      (_, error) => {
        console.error('Error fetching words: ', error);
        Toast.show(error.message);
      }
    );
  });
  db.close();
};

/**
 * Функция для добавления группы в таблицу groups
 * @param group_name Название группы
 * @param image_path Путь до картинки на устройстве
 */
export const addGroup = async (group_name: string, image_path: string | null = null): Promise<void> => {
  const db = await getDBConnection();
  await db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO groups (group_name, image_path) 
      VALUES (?, ?);`,
      [group_name, image_path],
      () => {
        Toast.show(i18n.t("Folder created"));
      },
      (_, error) => {
        console.error('Error fetching words: ', error);
        Toast.show(error.message);
      }
    );
  });
  db.close();
};

/**
 * Получение всех слов с сортировкой по дате или алфавиту
 * @param orderBy Тип сортировки ('date_asc', 'date_desc', 'alphabet_asc', 'alphabet_desc')
 * @returns Массив слов
 */
export const getAllWords = async (
  orderBy: ISortTypeWords 
): Promise<WordsDBResponse> => {
  const db = await getDBConnection();
  let words: WordsDBResponse = [];

  // Определяем строку для сортировки в зависимости от параметра orderBy
  let orderClause: string;
  switch (orderBy) {
    case 'date_asc':
      orderClause = 'added_date ASC';
      break;
    case 'date_desc':
      orderClause = 'added_date DESC';
      break;
    case 'alphabet_asc':
      orderClause = 'original_word ASC';
      break;
    case 'alphabet_desc':
      orderClause = 'original_word DESC';
      break;
    default:
      orderClause = 'added_date DESC'; // По умолчанию
  }

  await db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM words ORDER BY ${orderClause}`,
      [],
      (_, { rows }) => {
        words = Array.from({ length: rows.length }).map((_, i) => rows.item(i));
      },
      (_, error) => {
        console.error('Error fetching words: ', error);
        Toast.show(error.message);
      }
    );
  });

  db.close();
  return words;
};

/**
 * Получение всех слов по группе с сортировкой
 * @param groupId ID группы для фильтрации
 * @param orderBy Тип сортировки ('date_asc', 'date_desc', 'alphabet_asc', 'alphabet_desc')
 * @returns Массив слов
 */
export const getWordsByGroup = async (
  groupId: number,
  orderBy: ISortTypeWords
): Promise<WordsDBResponse> => {
  const db = await getDBConnection();
  let words: WordsDBResponse = [];

  // Определяем строку для сортировки в зависимости от параметра orderBy
  let orderClause: string;
  switch (orderBy) {
    case 'date_asc':
      orderClause = 'added_date ASC';
      break;
    case 'date_desc':
      orderClause = 'added_date DESC';
      break;
    case 'alphabet_asc':
      orderClause = 'original_word ASC';
      break;
    case 'alphabet_desc':
      orderClause = 'original_word DESC';
      break;
    default:
      orderClause = 'added_date DESC'; // По умолчанию
  }

  await db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM words WHERE group_id = ? ORDER BY ${orderClause}`,
      [groupId],
      (_, { rows }) => {
        words = Array.from({ length: rows.length }).map((_, i) => rows.item(i));
      },
      (_, error) => {
        console.error('Error fetching words by group: ', error);
        Toast.show(error.message);
      }
    );
  });

  db.close();
  return words;
};

/**
 * Получение списка всех групп
 * @returns Массив групп
 */
export const getAllGroups = async (): Promise<FoldersDBResponse> => {
  const db = await getDBConnection();
  let groups: FoldersDBResponse = [];

  await db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM groups`,
      [],
      (_, { rows }) => {
        groups = Array.from({ length: rows.length }).map((_, i) => rows.item(i));
      },
      (_, error) => {
        console.error('Error fetching groups: ', error);
        Toast.show(error.message);
      }
    );
  });

  db.close();
  return groups;
};

/**
 * Получение количества всех слов
 * @returns количество слов
 */
export const getAllWordCount = async (): Promise<number> => {
  const db = await getDBConnection();
  let count = 0;
  await db.transaction(tx => {
    tx.executeSql(
      `SELECT COUNT(*) as count FROM words`,
      [],
      (_, results) => {
        count = results.rows.item(0).count;
      },
      (_, error) => {
        console.error('Error fetching word count: ', error);
        Toast.show(error.message);
        return null;
      }
    );
  });
  return count;
}

/**
 * Получение количества слов, относящихся к определенной папке
 * @param groupId ID папки
 * @returns количество слов в папке
 */
export const getWordCountByGroupId = async (groupId: number): Promise<number> => {
  const db = await getDBConnection();
  let count = 0;
  await db.transaction(tx => {
    tx.executeSql(
      `SELECT COUNT(*) as count FROM words WHERE group_id = ?`,
      [groupId],
      (_, results) => {
        count = results.rows.item(0).count;
      },
      (_, error) => {
        console.error('Error fetching word count: ', error);
        Toast.show(error.message);
        return null;
      }
    );
  });
  return count;
}

/**
 * Удаление слова по ID
 * @param wordId ID слова, которое нужно удалить
 */
export const deleteWord = async (wordId: number): Promise<void> => {
  const db = await getDBConnection();
  await db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM words WHERE id = ?`,
      [wordId],
      () => {
        Toast.show(i18n.t("Word deleted"));
        dbEventEmitter.emit(events.WORD_DELETED);
      },
      (_, error) => {
        console.error('Error deleting word: ', error);
        Toast.show(error.message);
      }
    );
  });
  db.close();
};

/**
 * Удаление группы по ID и очистка ссылки на группу в таблице со словами
 * @param groupId ID группы, которую нужно удалить
 */
export const deleteGroup = async (groupId: number): Promise<void> => {
  const db = await getDBConnection();
  await db.transaction(async tx => {
    // Сначала очищаем ссылку на группу в таблице `words`
    tx.executeSql(
      `UPDATE words SET group_id = NULL WHERE group_id = ?`,
      [groupId],
      () => {
        console.log('Group reference cleared in words table');
      },
      (_, error) => {
        console.error('Error clearing group reference in words: ', error);
        Toast.show(error.message);
      }
    );

    // Теперь удаляем саму группу
    tx.executeSql(
      `DELETE FROM groups WHERE id = ?`,
      [groupId],
      () => {
        Toast.show(i18n.t("Folder deleted"));
      },
      (_, error) => {
        console.error('Error deleting group: ', error);
        Toast.show(error.message);
      }
    );
  });

  db.close();
};