import React from "react";
import { 
  Pressable, 
  StyleSheet, 
  Text, 
  TextStyle, 
  ViewStyle 
} from "react-native";
import { useTheme } from "../hooks";

interface IMainButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const MainButton = ({ text, style, textStyle, onPress }: IMainButtonProps) => {
  const theme = useTheme();
  return (
    <Pressable style={[styles.button, { backgroundColor: theme.colors.button }, style]} onPress={onPress}>
      <Text style={[styles.text, { color: theme.colors.text }, textStyle]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15
  },
  text: {
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 5
  }
});