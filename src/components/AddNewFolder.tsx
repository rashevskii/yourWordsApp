import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles";

export interface IAddNewFolderProps {

}

export const AddNewFolder: FC<IAddNewFolderProps> = () => {
  const { t } = useTranslation();
  const { colors: { border, primary, text } } = useTheme();
  const [inputShowed, setInputShowed] = useState(false);
  const { baseButton } = globalStyles;
  return (
    <>
      {
        !inputShowed ? (
          <TouchableOpacity onPress={() => setInputShowed(true)} style={[baseButton, { backgroundColor: primary, borderColor: primary }]}>
            <Text style={{ color: text }}>
              {t("New folder")}
            </Text>
          </TouchableOpacity>
        ) : null
      }
      {
        inputShowed && (
          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { borderColor: border }]}>
              <TextInput
                placeholder={t("Folder name")}
              />
            </View>
            <TouchableOpacity onPress={() => setInputShowed(false)} style={[baseButton, { borderColor: primary }]}>
              <Text style={{ color: text }}>
                {t("Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
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