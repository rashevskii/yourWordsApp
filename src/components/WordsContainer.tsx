import React, { FC } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { WordDBResponse } from "../types/database";
import { Word } from "./Word";
import { useTheme } from "../hooks";
import { TrainingProgressComponent } from "./TrainingProgressComponent";
import { TrashComponent } from "./TrashComponent";
import Sound from "../assets/icons/sound.svg";
import AddFolderIcon from "../assets/icons/folder-add.svg";
import { useTranslation } from "react-i18next";

export interface IWordContainerProps {
  words: WordDBResponse;
  onDeleteWord: (id: number) => Promise<void>;
}

export const WordContainer: FC<IWordContainerProps> = ({ words, onDeleteWord }) => {
  const { colors: { border, secondary } } = useTheme();
  const { t } = useTranslation();
  const idWord = words.id;
  const original = words.original_word;
  const additional = words.additional_translation;
  const native = words.native_translation;

  const onDelete = () => {
    Alert.alert(
      t("Attention"),
      t("Are you sure you want to delete this word"),
      [
        {
          text: t("Cancel"),
          onPress: () => {},
          style: "cancel"
        },
        {
          text: t("Yes delete"),
          onPress: () => onDeleteWord(idWord)
        }
      ]
    )
  }

  const Buttons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <TrainingProgressComponent percentage={40} />
        <TouchableOpacity onPress={onDelete}>
          <TrashComponent />
        </TouchableOpacity>
        <TouchableOpacity>
          <Sound width={28} height={28} color={secondary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AddFolderIcon width={28} height={28} color={secondary} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    additional ? (
      <View style={[styles.container, styles.horizontal, { borderBottomColor: border }]}>
        <View style={styles.horizontalRow}>
          <Word text={original} />
          <Word text={additional} />
        </View>
        <View style={styles.horizontalRow}>
          <Word text={native} />
        </View>
        <Buttons />
      </View>
    ) : (
      <View style={[styles.container, styles.horizontal, { borderBottomColor: border }]}>
        <View style={styles.horizontalRow}>
          <Word text={original} />
          <Word text={native} />
        </View>
        <Buttons />
      </View>
    )
  ) 
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  horizontal: {
    alignItems: "center"
  },
  vertical: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  horizontalRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  verticalRow: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  }
});