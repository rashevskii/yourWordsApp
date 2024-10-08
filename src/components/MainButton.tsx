import React from "react";
import { 
  StyleSheet, 
  Text, 
  TextStyle, 
  TouchableOpacity, 
  ViewStyle 
} from "react-native";
import { useTheme } from "../hooks";

interface IMainButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const MainButton = ({ text, style, textStyle, onPress, disabled }: IMainButtonProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={[
      styles.button, 
      { backgroundColor: theme.colors.button }, 
      style,
      {
        opacity: disabled ? .5 : 1
      }
    ]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.text, { color: theme.colors.text }, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 15
  },
  text: {
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 5
  },
});