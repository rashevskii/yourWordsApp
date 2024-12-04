import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { globalStyles } from "../styles";

export interface IBottomSheetActionButtonsProps {
  negativeActionText: string;
  positiveActionText: string;
  negativeAction?: () => Promise<void> | void;
  positiveAction?: () => Promise<void> | void;
  disabledPositive?: boolean;
  disabledNegative?: boolean
}

export const BottomSheetActionButtons: FC<IBottomSheetActionButtonsProps> = ({
  positiveActionText,
  negativeActionText,
  positiveAction,
  negativeAction,
  disabledNegative,
  disabledPositive
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
      <TouchableOpacity 
        style={[
          baseButton, 
          styles.button, 
          { borderColor: primary },
          disabledNegative ? styles.opacity : undefined
        ]} 
        onPress={negativeAction}
        disabled={disabledNegative}
      >
        <Text style={{ color: text }}>{negativeActionText}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          baseButton, 
          styles.button, 
          { borderColor: primary, backgroundColor: button },
          disabledPositive ? styles.opacity : undefined
        ]} 
        onPress={positiveAction}
        disabled={disabledPositive}
      >
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
  opacity: {
    opacity: 0.5
  },
});