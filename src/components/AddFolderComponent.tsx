import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AddFolderIcon from "../assets/icons/folder-add.svg";
import { useTheme } from "../hooks";

export interface IAddFolderProps {
  onPress: () => void;
}

export const AddFolderComponent: FC<IAddFolderProps> = ({ onPress }) => {
  const { colors: { secondary, background } } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: secondary }]} onPress={onPress}>
      <AddFolderIcon width={35} height={35} color={background} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 35,
    position: "absolute",
    bottom: 20,
    left: 20
  }
});