import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TrainingProgressComponent } from "./TrainingProgressComponent";
import Sound from "../assets/icons/sound.svg";
import AddFolderIcon from "../assets/icons/folder-add.svg";
import { TrashComponent } from "./TrashComponent";
import { useTheme } from "../hooks";

export interface IButtonsInTranslateProps {
  onDelete: (id: number) => void;
  wordId: number;
  onAddFolder: (wordId: number) => void;
}

export const ButtonsInTanslate: FC<IButtonsInTranslateProps> = ({ onDelete, wordId, onAddFolder }) => {
  const { colors: { secondary } } = useTheme();
  return (
    <View style={styles.buttonsContainer}>
      <TrainingProgressComponent percentage={40} />
      <TouchableOpacity onPress={() => onDelete(wordId)}>
        <TrashComponent />
      </TouchableOpacity>
      <TouchableOpacity>
        <Sound width={28} height={28} color={secondary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onAddFolder(wordId)}>
        <AddFolderIcon width={28} height={28} color={secondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  }
});