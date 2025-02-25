import React, { FC, ReactNode } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { useTheme } from "../hooks";

export interface IHeaderProps {
  title?: string;
  leftIcon?: () => ReactNode;
  rightIcon?: () => ReactNode;
  titleStyle?: TextStyle;
}

export const HeaderComponent: FC<IHeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  titleStyle
}) => {
  const { colors: { background, text } } = useTheme();
  return  (
    <View style={[styles.header, { backgroundColor: background }]}>
      {leftIcon && leftIcon()}
      {title && <Text style={[styles.headerTitle, { color: text }, titleStyle]}>{title}</Text>}
      {rightIcon && rightIcon()}
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold"
  }
});