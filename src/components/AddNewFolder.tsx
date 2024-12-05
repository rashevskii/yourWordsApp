import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles";

export interface IAddNewFolderProps {
  onOpenInput: () => void;
  onCloseInput: () => void;
  inputOpened: boolean;
  saveFolder: (folderName: string) => Promise<void>;
  onChangeFolderName: (folderName: string) => void;
  folderName: string;
}

export const AddNewFolder: FC<IAddNewFolderProps> = ({
  onCloseInput,
  onOpenInput,
  inputOpened,
  saveFolder,
  onChangeFolderName,
  folderName
}) => {
  const { t } = useTranslation();
  const { colors: { border, primary, text } } = useTheme();
  const { baseButton } = globalStyles;
  return (
    <View style={[styles.container, { borderBottomColor: border }]}>
      {
        !inputOpened ? (
          <TouchableOpacity 
            onPress={onOpenInput} 
            style={[baseButton, styles.button, { backgroundColor: primary, borderColor: primary }]}
          >
            <Text style={{ color: text }}>
              {t("New folder")}
            </Text>
          </TouchableOpacity>
        ) : null
      }
      {
        inputOpened && (
          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { borderColor: border }]}>
              <TextInput
                placeholder={t("Folder name")}
                value={folderName}
                onChangeText={(text) => onChangeFolderName(text)}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity 
                onPress={onCloseInput} 
                style={[baseButton, styles.button, { borderColor: primary }]}
              >
                <Text style={{ color: text }}>
                  {t("Cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => saveFolder(folderName)}
                style={[baseButton, styles.button, { borderColor: primary, backgroundColor: primary }]}
              >
                <Text style={{ color: text }}>
                  {t("Add folder")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginBottom: 20
  },
  button: {
    alignItems: "center",
    marginHorizontal: 5
  },
  inputContainer: {
    width: "100%"
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
});