import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks";

export interface SettingsItemProps {
  Icon: React.ElementType;
  itemName: string;
  Component: React.ElementType;
}

export const SettingsItemComponent: FC<SettingsItemProps> = ({
  Icon,
  itemName,
  Component,
}) => {
  const { colors: { text } } = useTheme();
  const {
    rowStyles,
    rowNameStyles,
    nameStyles
  } = styles;
  return (
    <View style={rowStyles}>
      <View style={rowNameStyles}>
        <Icon />
        <Text style={[nameStyles, { color: text }]}>{itemName}</Text>
      </View>
      <Component />
    </View>
  );
}

const styles = StyleSheet.create({
  rowStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  rowNameStyles: {
    flexDirection: "row",
    alignItems: "center"
  },
  nameStyles: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10
  }
});