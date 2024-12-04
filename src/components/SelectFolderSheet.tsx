import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetActionButtons } from "./BottomSheetActionButtons";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { AddNewFolder } from "./AddNewFolder";
import { getAllGroups } from "../database";
import { FoldersDBResponse } from "../types/database";
import { FolderButton } from "./FolderButton";

export interface ISelectFolderSheetProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  onAddWordInFolder: () => Promise<void>;
  selectedFolderId: number | null;
  onSelectFolder: (id: number | null) => void;
}

export const SelectFolderSheet: FC<ISelectFolderSheetProps> = ({ 
  opened, 
  setOpened, 
  selectedFolderId,
  onAddWordInFolder,
  onSelectFolder
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["75%"], []);
  const { t } = useTranslation();
  const [folderList, setFolderList] = useState<FoldersDBResponse>([]);
  const [newFolderOpened, setNewFolderOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      const getFolders = async () => {
        const folders = await getAllGroups();
        const allFolders = [
          {
            id: null, 
            group_name: t("All words"), 
            image_path: null, 
          },
          ...folders
        ]
        if (folders) {
          setFolderList(allFolders);
        } 
      }
      getFolders();
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
    setOpened(false);
  }, []);

  const handleOpenInputNewFolder = useCallback(() => {
    setNewFolderOpened(true);
  }, []);

  const handleCloseInputNewFolder = useCallback(() => {
    setNewFolderOpened(false);
  }, []);

  const renderFolderList = () => {
    return folderList.map(folder => {
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