export type WordDBResponse = {
  id: number; 
  original_word: string; 
  native_translation: string; 
  additional_translation: string | null; 
  added_date: string
}

export type FolderDBResponse = {
  id: number; 
  group_name: string; 
  image_path: string | null
}

export type FoldersDBResponse = FolderDBResponse[];
export type WordsDBResponse = WordDBResponse[];

