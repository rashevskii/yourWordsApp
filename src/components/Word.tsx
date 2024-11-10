import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks";

export interface IWordProps {
  text: string;
}

export const Word: FC<IWordProps> = ({ text }) => {
  const { colors: { border } } = useTheme();
  return (
    <View style={[styles.container, { borderColor: border }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10 ,
    marginHorizontal: 15,
    marginVertical: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 18
  }
});