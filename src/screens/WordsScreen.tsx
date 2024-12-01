import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
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
import { deleteWord, getAllWords, getWordsByGroup, ISortTypeWords } from "../database";
import { WordDBResponse, WordsDBResponse } from "../types/database";
import { errorHandler } from "../helpers";

type WordsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Words'>;
export type WordsRouteProp = RouteProp<MainStackParamList, 'Words'>;

export interface IWordsProps {
  navigation: WordsNavigationProp;
  route: WordsRouteProp;
}

export const WordsScreen: FC<IWordsProps> = ({ route: { params: { 
  idFolder
 } } }) => {
  const { t } = useTranslation();
  const sortItems = useMemo(() => [
    { label: t("Date added"), value: "date_asc" },
    { label: t("Date added"), value: "date_desc" },
    { label: t("Alphabet"), value: "alphabet_asc" },
    { label: t("Alphabet"), value: "alphabet_desc" }
  ], []);
  const { containerPadding, baseContainer } = globalStyles;
  const { colors: { background, secondary, invertedText, text } } = useTheme();
  const [selectedSort, setSelectedSort] = useState(sortItems[0]);
  const [translations, setTranslations] = useState<WordsDBResponse>([]);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idSelectedFolder, setIdSelectedFolder] = useState<number | null>(null);

  useEffect(() => {
    const fethWords = async () => {
      setLoading(true);
      try {
        if (idFolder) {
          const translations = await getWordsByGroup(idFolder, selectedSort.value as ISortTypeWords);
          setTranslations(translations);
        } else {
          const translations = await getAllWords(selectedSort.value as ISortTypeWords);
          setTranslations(translations);
        }
      } catch (error: any) {
        errorHandler({error});
      } finally {
        setLoading(false);
      }
    }
    fethWords();
  }, []);

  const selectButton = (selectedItem: SelectItem<string>) => {
    return (
      <View style={[styles.selectButton, { backgroundColor: secondary  }]}>
        <Text style={[styles.selectButtonText, { color: invertedText }]}>
          {selectedItem && selectedItem.label}
        </Text>
        {
          selectedItem && selectedItem.value.includes("Desc") ? 
          <ArrowDownIcon width={25} height={25} color={invertedText} /> : 
          <ArrowUpIcon width={25} height={25} color={invertedText} />
        }
      </View>
    );
  }
  
  const selectItem = (item: SelectItem<string>) => {
    return (
      <View style={styles.selectItem}>
        <Text style={[styles.selectItemText, { color: text }]}>{item.label}</Text>
        {
          item.value.includes("Desc") ? 
          <ArrowDownIcon width={25} height={25} color={text} /> : 
          <ArrowUpIcon width={25} height={25} color={text} />
        }
      </View>
    );
  }

  const onSelectLanguages = useCallback((value: SelectItem<string>) => {
    setSelectedSort(value);
  }, []);

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

  const onAddWordInFolder = (id: number | null) => {
    setOpened(true);
    setIdSelectedFolder(id);
  }

  const renderItem = ({ item }: {item: WordDBResponse}) => {
    return (
      <WordContainer 
        key={item.id} 
        words={item} 
        onDeleteWord={onDeleteTranslate} 
        onAddFolder={onAddWordInFolder}
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
        <SearchComponent />
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>{t("Sort by")}</Text>
          <SelectableComponent 
            items={sortItems} 
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
        setOpened={setOpened} 
        opened={opened} 
        selectedWord={idSelectedFolder}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  sortLabel: {
    fontSize: 18,
    paddingVertical: 5,
    marginRight: 10
  },
  selectButton: { 
    borderRadius: 20, 
    paddingHorizontal: 15, 
    paddingVertical: 5, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 180
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