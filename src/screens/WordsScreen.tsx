import React, { FC, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles";
import { useTheme } from "../hooks";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../navigations";
import { RouteProp } from "@react-navigation/native";
import {  
  Loading,
  SearchComponent, 
  SelectableComponent,
  SelectFolderSheet,
  WordContainer,
} from "../components";
import { SelectItem } from "../types";
import { useTranslation } from "react-i18next";
import ArrowDownIcon from "../assets/icons/arrow-down.svg";
import ArrowUpIcon from "../assets/icons/arrow-up.svg";
import { 
  addGroup,
  deleteWord, 
  getAllGroups, 
  getAllWords, 
  getWordsByGroup, 
  ISortTypeWords, 
  searchWords, 
  updateGroupForWord 
} from "../database";
import { FoldersDBResponse, WordDBResponse, WordsDBResponse } from "../types/database";
import { errorHandler } from "../helpers";

type WordsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Words'>;
export type WordsRouteProp = RouteProp<MainStackParamList, 'Words'>;

export interface IWordsProps {
  navigation: WordsNavigationProp;
  route: WordsRouteProp;
}

export const WordsScreen: FC<IWordsProps> = ({ route: { params: { 
  idFolder,
  folderName
 } } }) => {
  const { t } = useTranslation();
  const sortItems = useMemo(() => [
    { label: t("Date added"), value: "date_asc" },
    { label: t("Date added"), value: "date_desc" },
    { label: t("Alphabet"), value: "alphabet_asc" },
    { label: t("Alphabet"), value: "alphabet_desc" }
  ], []);
  const { containerPadding, baseContainer } = globalStyles;
  const { colors: { background, text } } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState(sortItems[0]);
  const [translations, setTranslations] = useState<WordsDBResponse>([]);
  const [openedFolders, setOpenedFolders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idSelectedFolder, setIdSelectedFolder] = useState<number | null>(idFolder);
  const [nameSelectedFolder, setNameSelectedFolder] = useState<string>(folderName);
  const [selectedWordForAdding, setSelectedWordForAdding] = useState<number | null>(null);
  const [folders, setFolders] = useState<FoldersDBResponse>([]);

  useEffect(() => {
    if (query.length === 0) {
      fethData();
    } else {
      onSearchWords();
    }
  }, [selectedSort]);

  useEffect(() => {
    const timer = setTimeout(onSearchWords, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const fethData = async () => {
    setLoading(true);
    try {
      if (idFolder) {
        const translations = await getWordsByGroup(idFolder, selectedSort.value as ISortTypeWords);
        setTranslations(translations);
      } else {
        const translations = await getAllWords(selectedSort.value as ISortTypeWords);
        setTranslations(translations);
      }
      const folders = await getAllGroups();
      let allFolders = [
        {
          id: null, 
          group_name: t("All words"), 
          image_path: null, 
        },
        ...folders
      ];
      if (idFolder !== null) {
        const firstElement = allFolders.find((folder) => folder.id === idFolder);
        if (firstElement) {
          const filteredFolders = allFolders.filter((folder) => folder.id !== firstElement.id);
          allFolders = [firstElement, ...filteredFolders];
        }
      }
      setFolders(allFolders);
    } catch (error: any) {
      errorHandler({error});
    } finally {
      setLoading(false);
    }
  }

  const onSearchWords = async (): Promise<void> => {
    if (query.length === 0) {
      fethData();
    } else {
      const translations = await searchWords(query, idFolder, selectedSort.value as ISortTypeWords);
      setTranslations(translations);
    }
  }

  const selectButton = (selectedItem: SelectItem<string> | null) => {
    return (
      <View style={styles.selectButton}>
        <Text style={[styles.selectButtonText, { color: text }]}>
          {selectedItem && selectedItem.label}
        </Text>
        {
          selectedItem && selectedItem.value.includes("desc") ? 
          <ArrowDownIcon width={25} height={25} color={text} /> : 
          <ArrowUpIcon width={25} height={25} color={text} />
        }
      </View>
    );
  }
  
  const selectItem = (item: SelectItem<string>) => {
    return (
      <View style={styles.selectItem}>
        <Text style={[styles.selectItemText, { color: text }]}>{item.label}</Text>
        {
          item.value.includes("desc") ? 
          <ArrowDownIcon width={25} height={25} color={text} /> : 
          <ArrowUpIcon width={25} height={25} color={text} />
        }
      </View>
    );
  }

  const onSelectLanguages = (value: SelectItem<string>) => {
    setSelectedSort(value);
  };

  const onDeleteTranslate = async (id: number) => {
    setLoading(true);
    try {
      await deleteWord(id);
      const wordsAfterDelete = translations.filter(translation => translation.id !== id);
      setTranslations(wordsAfterDelete);
    } catch(error: any) {
      errorHandler({error});
    } finally {
      setLoading(false);
    } 
  }

  const onFolder = (idWord: number) => {
    setOpenedFolders(true);
    setSelectedWordForAdding(idWord);
  }

  const handleSelectFolder = (idFolder: number | null, nameFolder: string) => {
    setIdSelectedFolder(idFolder);
    setNameSelectedFolder(nameFolder);
  };

  const handleCloseSelectFolder = () => {
    setIdSelectedFolder(idFolder);
    setNameSelectedFolder(folderName);
    setOpenedFolders(false);
  }

  const handleAddWordInFolder = async () => {
    if (idSelectedFolder !== idFolder) {
      setLoading(true);
      await updateGroupForWord(idSelectedFolder, selectedWordForAdding!, nameSelectedFolder)
        .then(async () => {
          if (idFolder === null) {
            const updatedTranslations = translations.map((translation) => {
              if (translation.id === selectedWordForAdding) {
                translation.group_id = idSelectedFolder;
                translation.group_name = nameSelectedFolder;
              }
              return translation;
            });
            setTranslations(updatedTranslations);
          } else {
            const filteredTranslations = 
              translations.filter((translation) => translation.id !== selectedWordForAdding);
            setTranslations(filteredTranslations);
          }
          setOpenedFolders(false);
          setIdSelectedFolder(idFolder);
          setSelectedWordForAdding(null);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  };

  const handleAddFolder = async (folderName: string) => {
    setLoading(true);
    try {
      const addedFolderId = await addGroup(folderName);
      if (addedFolderId) {
        setIdSelectedFolder(addedFolderId);
        setNameSelectedFolder(folderName);
        const updatedFolders = [
          { id: addedFolderId, group_name: folderName, image_path: null }, 
          ...folders
        ];
        setFolders(updatedFolders);
      }
    } catch (error: any) {
      errorHandler({error});
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }: {item: WordDBResponse}) => {
    return (
      <WordContainer 
        key={item.id} 
        word={item} 
        onDeleteWord={onDeleteTranslate} 
        onAddFolder={onFolder}
        idCurrentFolder={idFolder}
      />
    )
  }

  return (
    <>
      <View 
        style={[
          baseContainer, 
          containerPadding, 
          { backgroundColor: background }
        ]}
      >
        <SearchComponent 
          onChangeText={setQuery} 
          value={query} 
        />
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>{t("Sort by")}</Text>
          <SelectableComponent<string> 
            items={sortItems}
            showShevron={true}
            renderButton={selectButton}
            renderItem={selectItem}
            onValueChange={onSelectLanguages}
            defaultValue={selectedSort}
          />
        </View>
        <FlatList
          data={translations}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        {loading && <Loading />}
      </View>
      <SelectFolderSheet
        folders={folders}
        opened={openedFolders} 
        selectedFolderId={idSelectedFolder}
        onAddWordInFolder={handleAddWordInFolder}
        onSelectFolder={handleSelectFolder}
        onCloseSelectFolder={handleCloseSelectFolder}
        saveFolder={handleAddFolder}
      />
      {loading && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center"
  },
  sortLabel: {
    fontSize: 18,
    paddingVertical: 5,
    marginRight: 10
  },
  selectButton: { 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectButtonText: { 
    fontSize: 16 
  },
  selectItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  selectItemText: {
    fontSize: 16
  }
});