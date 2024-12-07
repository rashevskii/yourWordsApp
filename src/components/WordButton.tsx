import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks";

export interface IWordButtonProps {
  selectTranslate?: (index: number, word: string) => void;
  index: number;
  word: string;
}

export const WordButton: FC<IWordButtonProps> = ({
  selectTranslate,
  index,
  word,
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
      style={[styles.button, { borderColor: primary, backgroundColor: button }]}
      onPress={selectTranslate ? () => selectTranslate(index, word) : undefined}
    >
      <Text style={[styles.text, { color: text }]}>{word}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    margin: 5
  },
  text: {
    fontSize: 16,
    fontWeight: "bold"
  }
});