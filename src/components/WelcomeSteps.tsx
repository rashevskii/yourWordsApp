import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { CircleComponent } from "./CircleComponent";

interface WelcomeStepsProps {
  activeMarker: number;
}

export const WelcomeSteps: FC<WelcomeStepsProps> = ({ activeMarker }) => {
  return (
    <View style={styles.container}>
      <CircleComponent fill={activeMarker === 0 ? "pink" : "grey"} />
      <CircleComponent fill={activeMarker === 1 ? "pink" : "grey"} />
      <CircleComponent fill={activeMarker === 2 ? "pink" : "grey"} />
      <CircleComponent fill={activeMarker === 3 ? "pink" : "grey"} />
      <CircleComponent fill={activeMarker === 4 ? "pink" : "grey"} />
      <CircleComponent fill={activeMarker === 5 ? "pink" : "grey"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
