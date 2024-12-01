import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { globalStyles } from "../styles";

export interface IBottomSheetActionButtonsProps {
  negativeActionText: string;
  positiveActionText: string;
  negativeAction?: () => void;
  positiveAction?: () => void;
}

export const BottomSheetActionButtons: FC<IBottomSheetActionButtonsProps> = ({
  positiveActionText,
  negativeActionText,
  positiveAction,
  negativeAction
}) => {
  const { colors: 
    { 
      primary, 
      button,
      text,
    } 
  } = useTheme();
  const { baseButton } = globalStyles;
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={[baseButton, styles.button, { borderColor: primary }]} onPress={negativeAction}>
        <Text style={{ color: text }}>{negativeActionText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[baseButton, styles.button, { borderColor: primary, backgroundColor: button }]} onPress={positiveAction}>
        <Text style={{ color: text }}>{positiveActionText}</Text>
      </TouchableOpacity>
    </View>
  );
} 

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15
  },
});