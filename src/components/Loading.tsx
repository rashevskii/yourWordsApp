import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { globalStyles } from "../styles";
import { useTheme } from "../hooks";

export interface ILoadingProps {
  size?: "large" | "small"
}

export const Loading: FC<ILoadingProps> = ({ size }) => {
  const { colors: { background } } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.layer, { backgroundColor: background }]}></View>
      <ActivityIndicator style={styles.indicator} size={size || "large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100
  },
  indicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 101,
  },
  layer: {
    opacity: 0.5, 
    width: "100%", 
    height: "100%"
  }
});