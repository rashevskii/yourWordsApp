import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { WordDBResponse } from "../types/database";
import { Word } from "./Word";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";
import { ButtonsInTanslate } from "./ButtonsInTranslate";

export interface IWordContainerProps {
  words: WordDBResponse;
  onDeleteWord: (id: number) => Promise<void>;
  onAddFolder: (id: number | null) => void;
}

export const WordContainer: FC<IWordContainerProps> = ({ words, onDeleteWord, onAddFolder }) => {
  const { colors: { border } } = useTheme();
  const { t } = useTranslation();
  const wordId = words.id;
  const original = words.original_word;
  const additional = words.additional_translation;
  const native = words.native_translation;
  const folderId = words.group_id;

  const onDelete = (id: number) => {
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
          onPress: async () => onDeleteWord(id)
        }
      ]
    )
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
        <ButtonsInTanslate
          onDelete={onDelete} 
          wordId={wordId} 
          onAddFolder={() => onAddFolder(folderId)}
        />
      </View>
    ) : (
      <View style={[styles.container, styles.horizontal, { borderBottomColor: border }]}>
        <View style={styles.horizontalRow}>
          <Word text={original} />
          <Word text={native} />
        </View>
        <ButtonsInTanslate 
          onDelete={onDelete} 
          wordId={wordId} 
          onAddFolder={() => onAddFolder(folderId)}
        />
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