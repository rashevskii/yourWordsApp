import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks";

export interface IWordsCountComponent {
  countOfWords: number;
}

export const WordsCountComponent: FC<IWordsCountComponent> = ({ countOfWords }) => {
  const { colors: { border, text } } = useTheme();
  return (
    <View style={[styles.container, { borderColor: border }]}>
      <Text style={[styles.text, { color: text }]}>{countOfWords}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 10
  }
});