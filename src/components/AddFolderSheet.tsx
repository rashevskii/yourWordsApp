import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, TextInput } from "react-native";
import { BottomSheetActionButtons } from "./BottomSheetActionButtons";

export interface IAddFolderSheetProps {
  opened: boolean;
  handleClose: () => void;
  handleSave: (folderName: string) => Promise<void>;
}

export const AddFolderSheet: FC<IAddFolderSheetProps> = ({
  opened,
  handleSave,
  handleClose
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const { t } = useTranslation();
  const { colors: 
    { 
      border, 
      text,
    } 
  } = useTheme();
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    if (opened) {
      handleSheetClose();
    } else {
      handleSheetOpen();
    }
  }, [opened]);

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetClose = useCallback(() => {
    bottomSheetRef.current?.close();
    setFolderName("");
    handleClose();
  }, []);

  const onSaveFolder = async (name: string) => {
    await handleSave(name).then(() => {
      handleSheetClose();
    });
  }

  const renderCreateFolder = () => {
    return (
      <TextInput
        placeholder={t("Enter folder name")}
        style={[styles.input, { borderColor: border, color: text }]}
        value={folderName}
        onChangeText={(text) => setFolderName(text)}
        onSubmitEditing={(event) => onSaveFolder(event.nativeEvent.text)}
        inputMode="text"
        returnKeyType={"done"}
      />
    );
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
    >
      <BottomSheetView style={styles.contentContainer}>
        {renderCreateFolder()}
        <BottomSheetActionButtons 
          positiveActionText={t("Save")}
          negativeActionText={t("Do not save")}
          negativeAction={handleSheetClose}
          positiveAction={() => onSaveFolder(folderName)}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%"
  }
});