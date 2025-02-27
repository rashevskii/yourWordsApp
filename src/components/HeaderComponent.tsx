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
  const {
    header,
    headerTitle,
    icon,
    leftIconStyles,
    rightIconStyles,
  } = styles;
  return  (
    <View style={[header, { backgroundColor: background }]}>
      <View style={[icon, leftIconStyles]}>
        {leftIcon && leftIcon()}
      </View>
      {title && <Text style={[headerTitle, { color: text }, titleStyle]}>{title}</Text>}
      <View style={[icon, rightIconStyles]}>
        {rightIcon && rightIcon()}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    position: "relative"
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute"
  },
  leftIconStyles: {
    left: 15
  },
  rightIconStyles: {
    right: 15
  }
});