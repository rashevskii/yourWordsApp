import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks";

export interface IFolderButtonProps {
  folderName: string;
  inputOpened: boolean;
  selectedFolder: number | null;
  id: number | null;
  onSelectFolder: (id: number | null) => void;
}

export const FolderButton: FC<IFolderButtonProps> = ({
  folderName,
  inputOpened,
  selectedFolder,
  id,
  onSelectFolder
}) => {
  const { colors: 
    { 
      primary, 
      button,
      text,
    } 
  } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { borderColor: primary }, 
        selectedFolder === id ? { backgroundColor: button } : { backgroundColor: "#fff" },
        inputOpened ? styles.opacity : undefined
      ]}
      onPress={() => onSelectFolder(id)}
      disabled={inputOpened}
    >
      <Text style={[styles.text, { color: text }]}>{folderName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    margin: 5,
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    fontWeight: "bold"
  },
  opacity: {
    opacity: 0.5
  }
});