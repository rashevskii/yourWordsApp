import SQLite, { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';
import { 
  FoldersDBResponse, 
  NewWordsCollection, 
  QueriesCollection, 
  WordDBResponse, 
  WordsDBResponse 
} from '../types/database';
import i18n from '../locales/i18n';
import { dbEventEmitter, events } from '../events';
import { AppState, AppStateStatus } from 'react-native';
import { useToast } from '../hooks';

export type ISortTypeWords  = string & {
  orderBy: 'date_asc' | 'date_desc' | 'alphabet_asc' | 'alphabet_desc';
}

// Включаем режим отладки (по желанию)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

let db: SQLiteDatabase | null = null;

const initDB = async (): Promise<void> => {
  if (!db) {
    db = await SQLite.openDatabase({ name: 'words.db', location: 'default' });
    console.log('Database opened');
  }
};

const getDBConnection = async (): Promise<SQLiteDatabase> => {
  if (!db) {
    await initDB();
  }
  if (!db) {
    throw new Error('Failed to initialize database');
  }
  return db;
};

/**
 * Очистка базы данных
 */
const cleanupDB = async (): Promise<void> => {
  if (db) {
    try {
      await db.close();
      console.log('Database closed');
    } catch (error) {
      console.error('Error closing database:', error);
    } finally {
      db = null;
    }
  }
};

AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
  if (nextAppState === 'background' || nextAppState === "inactive") {
    console.log('App is in background, cleaning up database connection');
    await cleanupDB();
  } else if (nextAppState === 'active') {
    console.log('App is active, initializing database connection');
    await initDB();
  }
});

/**
 * Универсальная функция для выполнения SQL-запросов
 */
const executeSql = async (query: string, params: any[] = []): Promise<ResultSet> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, result) => resolve(result),
        (_, error) => {
          console.error('SQL Error:', query, error);
          reject(error);
          return false;
        }
      );
    });
  });
};

/**
 * Универсальная функция для выполнения массива SQL-запросов
 */
const executeArraySql = async (queries: QueriesCollection): Promise<void> => {
  const db = await getDBConnection();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      for (let query of queries) {
        tx.executeSql(
          query.query,
          query.params || [],
          undefined,
          (_, error) => {
            console.error('SQL Error:', query, error);
            reject(error);
            return true;
          }
        );
      }
    },
    (error) => {
      console.error("Transaction error:", error);
      reject(error);
    },
    () => {
      resolve();
    });
  });
};

/**
 * Создание таблиц в базе данных
 */
export const createTables = async (): Promise<void> => {
  try {
    const db = await getDBConnection();
    await db.transaction(async (tx) => {
      await tx.executeSql(`
        CREATE TABLE IF NOT EXISTS words (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          original_word TEXT NOT NULL,
          additional_translation TEXT,
          native_translation TEXT NOT NULL,
          group_id INTEGER,
          group_name TEXT,
          added_date INTEGER NOT NULL,
          FOREIGN KEY (group_id) REFERENCES groups(id)
        );
      `);
    });
    await db.transaction(async (tx) => {
      await tx.executeSql(`
        CREATE TABLE IF NOT EXISTS groups (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          group_name TEXT NOT NULL,
          image_path TEXT
        );
      `);
    });
  } catch (error) {
    console.error('Error creating tables:', error);
    useToast(i18n.t('Failed to create tables'), 'danger');
  }
};

/**
 * Функция для добавления слова в таблицу words
 * @param original_word Оригинальное слово для перевода
 * @param native_translation Перевод на родной язык
 * @param additional_translation Перевод на дополнительный язык (необязательно)
 * @param group_id ID группы (если есть)
 * @param added_date Дата добавления
 */
export const addWord = async (
  original_word: string,
  native_translation: string,
  additional_translation: string | null = null,
  group_id: number | null = null,
  added_date: number
): Promise<void> => {
  try {
    if (!original_word || !native_translation || !added_date) {
      throw new Error(i18n.t('Invalid input parameters'));
    }

    await executeSql(
      `INSERT INTO words (original_word, native_translation, additional_translation, group_id, added_date) VALUES (?, ?, ?, ?, ?);`,
      [original_word, native_translation, additional_translation, group_id, added_date]
    );

    useToast(i18n.t("Word added"), "success");
    dbEventEmitter.emit(events.WORD_ADDED);
  } catch (error) {
    useToast(i18n.t("Error adding word"), 'danger');
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error in addWord:', error);
    }
  }
};

/**
 * Функция для добавления группы в таблицу groups
 * @param group_name Название группы
 * @param image_path Путь до картинки на устройстве
 */
export const addGroup = async (group_name: string, image_path: string | null = null): Promise<number | null> => {
  try {
    if (!group_name) {
      throw new Error(i18n.t('Invalid group name'));
    }

    const result = await executeSql(
      `INSERT INTO groups (group_name, image_path) VALUES (?, ?);`,
      [group_name, image_path]
    );
    useToast(i18n.t('Folder created'), "success");
    dbEventEmitter.emit(events.FOLDER_ADDED);
    return result.insertId;
  } catch (error) {
    useToast(i18n.t("Error adding group"), 'danger');
    if (error instanceof Error) {
      console.error('Error adding group:', error.message);
    } else {
      console.error('Unknown error in addGroup:', error);
    }
    return null;
  }
};

/**
 * Получение всех слов с сортировкой по дате или алфавиту
 * @param orderBy Тип сортировки ('date_asc', 'date_desc', 'alphabet_asc', 'alphabet_desc')
 * @returns Массив слов
 */
export const getAllWords = async (orderBy: string): Promise<WordsDBResponse> => {
  try {
    const orderClause = {
      date_asc: 'added_date ASC',
      date_desc: 'added_date DESC',
      alphabet_asc: 'original_word ASC',
      alphabet_desc: 'original_word DESC',
    }[orderBy] || 'added_date DESC';

    const results = await executeSql(`SELECT * FROM words ORDER BY ${orderClause}`);
    return Array.from({ length: results.rows.length }, (_, i) => results.rows.item(i));
  } catch (error) {
    useToast(i18n.t("Error fetching words"), 'danger');
    if (error instanceof Error) {
      console.error('Error fetching words:', error.message);
    } else {
      console.error('Unknown error in getAllWords:', error);
    }
    return [];
  }
};

/**
 * Получение слова по id
 * @param id ID записи
 * @returns Запись слова или null
 */
export const getWordById = async (id: number): Promise<WordDBResponse | null> => {
  try {
    const result = await executeSql('SELECT * FROM words WHERE id = ?', [id]);
    if (result.rows.length) {
      return result.rows.item(0);
    } else {
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching word:', error.message);
    } else {
      console.error('Unknown error in getWordById:', error);
    }
    return null;
  }
}

/**
 * Функция поиска
 * @param word искомое слово
 * @param groupId id группы
 * @param orderBy порядок сортировки
 * @returns Массив слов или пустой массив
 */
export const searchWords = async (
  word: string,
  groupId: number | null = null,
  orderBy: string
): Promise<WordsDBResponse> => {
  const orderClause = {
    date_asc: 'added_date ASC',
    date_desc: 'added_date DESC',
    alphabet_asc: 'original_word ASC',
    alphabet_desc: 'original_word DESC',
  }[orderBy] || 'added_date DESC';

  const sql = groupId !== null
    ? 
      `
        SELECT * FROM words 
        WHERE (original_word LIKE ? OR native_translation LIKE ? OR additional_translation LIKE ?) 
        AND group_id = ? 
        ORDER BY ${orderClause} 
        LIMIT 10;
      `
    : 
      `
        SELECT * FROM words 
        WHERE original_word LIKE ? 
        OR native_translation LIKE ? 
        OR additional_translation LIKE ? 
        ORDER BY ${orderClause} 
        LIMIT 10;
      `;

  const params = groupId !== null
    ? [`%${word}%`, `%${word}%`, `%${word}%`, groupId]
    : [`%${word}%`, `%${word}%`, `%${word}%`];

  try {
    const results = await executeSql(sql, params);
    if (results.rows.length) {
      return Array.from({ length: results.rows.length }, (_, i) => results.rows.item(i));
    } else {
      return [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error searching word:', error.message);
    } else {
      console.error('Unknown error in seacrhWord:', error);
    }
    return [];
  }
}

/**
 * Получение всех слов по группе с сортировкой
 * @param groupId ID группы для фильтрации
 * @param orderBy Тип сортировки ('date_asc', 'date_desc', 'alphabet_asc', 'alphabet_desc')
 * @returns Массив слов
 */
export const getWordsByGroup = async (
  groupId: number,
  orderBy: string
): Promise<WordsDBResponse> => {
  try {
    if (!groupId) throw new Error(i18n.t('Invalid group ID'));

    const orderClause = {
      date_asc: 'added_date ASC',
      date_desc: 'added_date DESC',
      alphabet_asc: 'original_word ASC',
      alphabet_desc: 'original_word DESC',
    }[orderBy] || 'added_date DESC';

    const results = await executeSql(
      `SELECT * FROM words WHERE group_id = ? ORDER BY ${orderClause}`,
      [groupId]
    );

    return Array.from({ length: results.rows.length }, (_, i) => results.rows.item(i));
  } catch (error) {
    useToast(i18n.t("Error fetching words by group"), 'danger');
    if (error instanceof Error) {
      console.error('Error fetching words by group:', error.message);
    } else {
      console.error('Unknown error in getWordsByGroup:', error);
    }
    return [];
  }
};

/**
 * Получение списка всех групп
 * @returns Массив групп
 */
export const getAllGroups = async (): Promise<FoldersDBResponse> => {
  try {
    const results = await executeSql(`SELECT * FROM groups`);
    return Array.from({ length: results.rows.length }, (_, i) => results.rows.item(i));
  } catch (error) {
    useToast(i18n.t("Error fetching groups"), 'danger');
    if (error instanceof Error) {
      console.error('Error fetching groups:', error);
    } else {
      console.error('Unknown error in getAllGroups:', error);
    }
    return [];
  }
};

/**
 * Получение количества всех слов
 * @returns количество слов
 */
export const getAllWordCount = async (): Promise<number> => {
  try {
    const results = await executeSql(
      `SELECT COUNT(*) as count FROM words`,
      []
    );

    return results.rows.item(0)?.count || 0;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching all word count:', error.message);
    } else {
      console.error('Unknown error in getAllWordCount:', error);
    }
    return 0;
  }
};

/**
 * Получение количества слов, относящихся к определенной папке
 * @param groupId ID папки
 * @returns количество слов в папке
 */
export const getWordCountByGroupId = async (groupId: number): Promise<number> => {
  try {
    if (!groupId) throw new Error(i18n.t('Invalid group ID'));

    const results = await executeSql(
      `SELECT COUNT(*) as count FROM words WHERE group_id = ?`,
      [groupId]
    );

    return results.rows.item(0)?.count || 0;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching word count by group ID:', error.message);
    } else {
      console.error('Unknown error in getWordCountByGroupId:', error);
    }
    return 0;
  }
};

/**
 * Обновляет group_id для заданного id слова в таблице words
 * @param {number | null} groupId - ID группы
 * @param {number} wordId - ID слова
 * @returns {Promise<void>}
 */
export const updateGroupForWord = async (
  groupId: number | null,
  wordId: number,
  groupName: string
): Promise<void> => {
  try {
    if (!wordId) throw new Error(i18n.t('Invalid word ID'));

    await executeSql(
      `UPDATE words SET group_id = ?, group_name = ? WHERE id = ?`,
      [groupId, groupName, wordId]
    );

    useToast(i18n.t('Word added to folder'), "success");
    dbEventEmitter.emit(events.WORD_ADDED);
  } catch (error) {
    useToast(i18n.t("Error updating group for word"), 'danger');
    if (error instanceof Error) {
      console.error('Error updating group for word:', error.message);
    } else {
      console.error('Unknown error in updateGroupForWord:', error);
    }
  }
};

/**
 * Обновляет слово для заданного id в таблице words
 * @param {number} wordId - ID слова
 * @param {string} word - слово
 * @returns {Promise<void>}
 */
export const updateWordById = async (
  wordId: number,
  word: string
): Promise<void> => {
  try {
    if (!wordId) throw new Error(i18n.t('Invalid word ID'));

    await executeSql(
      `UPDATE words SET original_word = ? WHERE id = ?`,
      [word, wordId]
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating group for word:', error.message);
    } else {
      console.error('Unknown error in updateGroupForWord:', error);
    }
  }
};

/**
 * Обновляет слова основного языка из массива по id в таблице words
 * @param {NewWordsCollection} newWords - массив объектов с id слова и новым словом
 * @returns {Promise<void>}
 */
export const updateMainWordsByIds = async (
  newWords: NewWordsCollection,
): Promise<void> => {
  const queries = newWords.map(({ id, word }) => {
    return {
      query: `UPDATE words SET original_word = ? WHERE id = ?`,
      params: [word, id]
    }
  });
  try {
    await executeArraySql(queries);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating list of words:', error.message);
    } else {
      console.error('Unknown error in updateMainWordsById:', error);
    }
  }
};

/**
 * Обновляет слова дополнительного языка из массива по id в таблице words
 * @param {NewWordsCollection} newWords - массив объектов с id слова и новым словом
 * @returns {Promise<void>}
 */
export const updateAdditionalWordsByIds = async (
  newWords: NewWordsCollection,
): Promise<void> => {
  const queries = newWords.map(({ id, word }) => {
    return {
      query: `UPDATE words SET additional_translation = ? WHERE id = ?`,
      params: [word, id]
    }
  });
  try {
    await executeArraySql(queries);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating list of words:', error.message);
    } else {
      console.error('Unknown error in updateAdditionalWordsById:', error);
    }
  }
};

/**
 * Обновляет слова родного языка из массива по id в таблице words
 * @param {NewWordsCollection} newWords - массив объектов с id слова и новым словом
 * @returns {Promise<void>}
 */
export const updateNativeWordsByIds = async (
  newWords: NewWordsCollection,
): Promise<void> => {
  const queries = newWords.map(({ id, word }) => {
    return {
      query: `UPDATE words SET native_translation = ? WHERE id = ?`,
      params: [word, id]
    }
  });
  try {
    await executeArraySql(queries);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating list of words:', error.message);
    } else {
      console.error('Unknown error in updateNativeWordsByIds:', error);
    }
  }
};

/**
 * Удаление слова по ID
 * @param wordId ID слова, которое нужно удалить
 */
export const deleteWord = async (wordId: number): Promise<void> => {
  try {
    if (!wordId) throw new Error(i18n.t('Invalid word ID'));

    await executeSql(`DELETE FROM words WHERE id = ?`, [wordId]);
    useToast(i18n.t('Word deleted'), "success");
    dbEventEmitter.emit(events.WORD_DELETED);
  } catch (error) {
    useToast(i18n.t("Error updating group for word"), 'danger');
    if (error instanceof Error) {
      console.error('Error deleting word:', error.message);
    } else {
      console.error('Unknown error in deleteWord:', error);
    }
  }
};

/**
 * Удаление группы по ID и очистка ссылки на группу в таблице со словами
 * @param groupId ID группы, которую нужно удалить
 */
export const deleteGroup = async (groupId: number): Promise<void> => {
  try {
    if (!groupId) throw new Error(i18n.t('Invalid group ID'));

    await executeSql(`UPDATE words SET group_id = NULL WHERE group_id = ?`, [groupId]);
    await executeSql(`DELETE FROM groups WHERE id = ?`, [groupId]);

    useToast(i18n.t('Folder deleted'), "success");
  } catch (error) {
    useToast(i18n.t("Error updating group for word"), 'danger');
    if (error instanceof Error) {
      console.error('Error deleting group:', error.message);
    } else {
      console.error('Unknown error in deleteGroup:', error);
    }
  }
};
