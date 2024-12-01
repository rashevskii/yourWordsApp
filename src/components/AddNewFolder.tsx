import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles";

export interface IAddNewFolderProps {
  onOpenInput: () => void;
  onCloseInput: () => void;
  inputOpened: boolean;
}

export const AddNewFolder: FC<IAddNewFolderProps> = ({
  onCloseInput,
  onOpenInput,
  inputOpened
}) => {
  const { t } = useTranslation();
  const { colors: { border, primary, text } } = useTheme();
  const [folderName, setFolderName] = useState("");
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
                onChangeText={(text) => setFolderName(text)}
              />
            </View>
            <TouchableOpacity onPress={onCloseInput} style={[baseButton, { borderColor: primary }]}>
              <Text style={{ color: text }}>
                {t("Cancel")}
              </Text>
            </TouchableOpacity>
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
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    flex: 0.9
  },
});