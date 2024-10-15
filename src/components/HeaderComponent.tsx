import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PlanetIcon from "../assets/icons/planet.svg";
import SettingsIcon from "../assets/icons/settings.svg";

export const HeaderComponent: FC = () => {
  return  (
    <View style={styles.header}>
      <TouchableOpacity>
        <PlanetIcon width={35} height={35} />
      </TouchableOpacity>
      <TouchableOpacity>
        <SettingsIcon width={35} height={35} />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
});