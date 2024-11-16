import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import { FolderComponent } from "./FolderComponent";
import { Loading } from "./Loading";
import { FoldersType, FolderType } from "../types";

export interface IFolderProps {
  folders: FoldersType;
  loading: boolean;
  handleDeleteFolder: (id: number) => void;
  handleOnPressFolder: (idFolder: number | null, folderName: string) => void;
}

export const FoldersListComponent: FC<IFolderProps> = ({
  folders,
  loading,
  handleDeleteFolder,
  handleOnPressFolder
}) => {
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