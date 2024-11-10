import React, { FC, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { FolderComponent } from "./FolderComponent";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { WordsScreenProps } from "../navigations";
import { getAllGroups, getAllWordCount, getWordCountByGroupId } from "../database";
import { errorHandler } from "../helpers";
import { Loading } from "./Loading";
import { FoldersType, FolderType } from "../types";
import { dbEventEmitter, events } from "../events";

export interface IFolderProps {
  
}

export const FoldersListComponent: FC<IFolderProps> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<WordsScreenProps['navigation']>();
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState<FoldersType>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      setLoading(true);
      try {
        const folders = await getAllGroups();
        const folderData = await Promise.all(folders.map(async (folder) => {
          const count = await getWordCountByGroupId(folder.id!);
          return {
            ...folder,
            count
          } as FolderType
        }));
        const countOfAllWords = await getAllWordCount();
        const allFolders = [
          ({ 
            id: null, 
            group_name: t("All words"), 
            image_path: null, 
            count: countOfAllWords 
          } as FolderType), 
          ...folderData
        ];
        setFolders(allFolders);
      } catch(error: any) {
        errorHandler({error});
      } finally {
        setLoading(false);
      }
    }
    fetchFolders();
    
    dbEventEmitter.addListener(events.WORD_ADDED, fetchFolders);
    dbEventEmitter.addListener(events.WORD_DELETED, fetchFolders);

    return () => {
      dbEventEmitter.removeAllListeners(events.WORD_ADDED);
      dbEventEmitter.removeAllListeners(events.WORD_DELETED);
    };
  }, []);

  const handleDeleteFolder = (id: number | null) => {
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

  const handleOnPressFolder = (idFolder: number | null, folderName: string) => {
    navigation.navigate("Words", {
      idFolder,
      folderName
    })
  }

  const renderItem = ({ item }: {item: FolderType}) => {
    return (
      <FolderComponent 
        idFolder={item.id}
        name={item.group_name}
        imagePath={item.image_path}
        countOfWords={item.count}
        percentage={30}
        onDeleteFolder={handleDeleteFolder}
        onFolder={handleOnPressFolder}
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
      {loading && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  }
});