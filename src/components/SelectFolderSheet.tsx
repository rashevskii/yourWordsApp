import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetActionButtons } from "./BottomSheetActionButtons";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { AddNewFolder } from "./AddNewFolder";
import { FoldersDBResponse } from "../types/database";
import { FolderButton } from "./FolderButton";
import { useToast } from "../hooks";

export interface ISelectFolderSheetProps {
  folders: FoldersDBResponse;
  opened: boolean;
  onAddWordInFolder: () => Promise<void>;
  selectedFolderId: number | null;
  onSelectFolder: (id: number | null, name: string) => void;
  onCloseSelectFolder: () => void;
  saveFolder: (folderName: string) => Promise<void>;
}

export const SelectFolderSheet: FC<ISelectFolderSheetProps> = ({ 
  folders,
  opened,
  selectedFolderId,
  onAddWordInFolder,
  onSelectFolder,
  onCloseSelectFolder,
  saveFolder
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["75%"], []);
  const { t } = useTranslation();
  const [newFolderOpened, setNewFolderOpened] = useState(false);
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    if (opened) {
      handleSheetOpen();
    } else {
      handleSheetClose();
    }
  }, [opened]);

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetClose = useCallback(() => {
    bottomSheetRef.current?.close();
    onCloseSelectFolder();
    handleCloseInputNewFolder();
  }, []);

  const handleOpenInputNewFolder = useCallback(() => {
    setNewFolderOpened(true);
  }, []);

  const handleCloseInputNewFolder = useCallback(() => {
    setNewFolderOpened(false);
    setFolderName("");
  }, []);

  const handleSaveFolder = async (folderName: string) => {
    if (folderName.trim().length) {
      const folderAlreadyExists = 
        folders.some((folder) => folder.group_name.toLowerCase() === folderName.toLowerCase());
      if (!folderAlreadyExists) {
        await saveFolder(folderName)
          .then(() => setNewFolderOpened(false));
      } else {
        useToast(t("Folder alredy exists"), "danger");
      }
    }
  }

  const renderFolderList = () => {
    return folders.map(folder => {
      return (
        <FolderButton 
          key={folder.id} 
          selectedFolder={selectedFolderId} 
          inputOpened={newFolderOpened} 
          folderName={folder.group_name}
          id={folder.id}
          onSelectFolder={onSelectFolder}
        />
      )
    })
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enableDynamicSizing={false}
      overDragResistanceFactor={0}
    >
      <View style={styles.contentContainer}>
        <AddNewFolder
          onCloseInput={handleCloseInputNewFolder}
          onOpenInput={handleOpenInputNewFolder}
          inputOpened={newFolderOpened}
          saveFolder={handleSaveFolder}
          onChangeFolderName={setFolderName}
          folderName={folderName}
        />
        <BottomSheetScrollView showsVerticalScrollIndicator={false} >
          {renderFolderList()}
        </BottomSheetScrollView>
        <BottomSheetActionButtons 
          positiveActionText={t("Save")}
          negativeActionText={t("Do not save")}
          negativeAction={handleSheetClose}
          disabledPositive={newFolderOpened}
          positiveAction={onAddWordInFolder}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
  },
});