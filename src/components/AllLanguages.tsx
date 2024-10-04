import React from "react";
import { StyleSheet, View } from "react-native";
import { 
  DenamrkIcon, 
  NorwayIcon,
  SwedenIcon,
  FinlandIcon,
  RussiaIcon,
  UkIcon,
  UkraineIcon,
} from "./flags";

export const AllLanguages = () => {
  return (
    <View style={styles.flagsContainer}>
      <NorwayIcon />
      <SwedenIcon />
      <DenamrkIcon />
      <FinlandIcon />
      <UkIcon />
      <UkraineIcon />
      <RussiaIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  flagsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 20
  }
});