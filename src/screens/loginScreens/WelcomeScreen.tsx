import React from "react";
import {
  StyleSheet, 
  View 
} from "react-native";
import { 
  WelcomeSteps, 
  DenamrkIcon, 
  NorwayIcon,
  SwedenIcon,
  FinlandIcon,
  RussiaIcon,
  UkIcon,
  UkrainIcon
} from "../../components";

export const WelcomeScreen = ({ navigation }: any) => {

  return (
    <View>
      <WelcomeSteps activeMarker={0} />
      <View style={styles.flagsContainer}>
        <NorwayIcon />
        <SwedenIcon />
        <DenamrkIcon />
        <FinlandIcon />
        <UkIcon />
        <UkrainIcon />
        <RussiaIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flagsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 25
  }
});