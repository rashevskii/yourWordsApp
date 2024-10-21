import React, { FC, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PlanetIcon from "../assets/icons/planet.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import { useTheme } from "../hooks";

export interface IHeaderProps {
  title?: string;
  leftIcon?: () => ReactNode;
  rightIcon?: () => ReactNode;
}

export const HeaderComponent: FC<IHeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
}) => {
  const { colors: { background, text } } = useTheme();
  return  (
    <View style={[styles.header, { backgroundColor: background }]}>
      {leftIcon && leftIcon()}
      {title && <Text style={[styles.headerTitle, { color: text }]}>{title}</Text>}
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