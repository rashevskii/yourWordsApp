export type WordDBResponse = {
  id: number; 
  original_word: string; 
  native_translation: string; 
  additional_translation: string | null; 
  group_id: number | null;
  group_name: string;
  added_date: string;
}

export type FolderDBResponse = {
  id: number | null; 
  group_name: string; 
  image_path: string | null;
}

export type FoldersDBResponse = FolderDBResponse[];
export type WordsDBResponse = WordDBResponse[];

export type NewWordsCollection = {
  id: number;
  word: string;
}[];

export type QueriesCollection = {
  query: string;
  params: any[];
}[];

