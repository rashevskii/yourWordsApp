import React, { FC, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { FolderComponent } from "./FolderComponent";
import { useTranslation } from "react-i18next";

export type FolderType = {
  id: string | null;
  name: string;
  image: string | null;
  countOfWords: number;
}

const foldersList: FolderType[] = [
  {
    id: null,
    name: "Все слова",
    image: null,
    countOfWords: 0
  },
  {
    id: "1",
    name: "Фотография",
    image: null,
    countOfWords: 0
  },
  {
    id: "2",
    name: "Парикмахер",
    image: null,
    countOfWords: 0
  },
  {
    id: "3",
    name: "Визаж",
    image: null,
    countOfWords: 0
  },
  {
    id: "4",
    name: "Неправильные глаголы",
    image: null,
    countOfWords: 0
  },
  {
    id: "5",
    name: "Автомобильная тематека",
    image: null,
    countOfWords: 0
  },
  {
    id: "6",
    name: "Автомобильная тематека",
    image: null,
    countOfWords: 0
  },
  {
    id: "7",
    name: "Автомобильная тематека",
    image: null,
    countOfWords: 0
  },
  {
    id: "8",
    name: "Автомобильная тематека",
    image: null,
    countOfWords: 0
  },
  {
    id: "9",
    name: "Автомобильная тематека",
    image: null,
    countOfWords: 0
  },
];

export const FoldersListComponent: FC = () => {
  const [folders, setFolders] = useState(foldersList);
  const { t } = useTranslation();

  const handleDeleteFolder = (id: string | null) => {
    Alert.alert(
      t("Attention"),
      t("Are you sure you want to delete this folder"),
      [
        {
          text: t("Cancel"),
          onPress: () => {}
        },
        {
          text: t("Yes delete"),
          onPress: () => setFolders((prevItems) => prevItems.filter((item) => item.id !== id))
        }
      ]
    )
  };

  const renderItem = ({ item }: {item: FolderType}) => {
    return (
      <FolderComponent 
        idFolder={item.id}
        name={item.name}
        imagePath={item.image}
        countOfWords={item.countOfWords}
        percentage={30}
        onDeleteFolder={handleDeleteFolder}
      />
    )
  }

  return (
    <>
      <FlatList
        data={folders}
        renderItem={renderItem}
        contentContainerStyle={styles.container} 
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  }
});