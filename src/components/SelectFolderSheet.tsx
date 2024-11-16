import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetActionButtons } from "./BottomSheetActionButtons";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export interface ISelectFolderSheetProps {
  opened: boolean;
}

export const SelectFolderSheet: FC<ISelectFolderSheetProps> = ({ opened }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', "50%", "75%"], []);
  const { t } = useTranslation();

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
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
    >
      <BottomSheetView style={styles.contentContainer}>
        <BottomSheetActionButtons 
          positiveActionText={t("Save")}
          negativeActionText={t("Do not save")}
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
});