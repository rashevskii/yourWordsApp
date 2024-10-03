import React from "react";
import { StyleSheet, View } from "react-native";
import { WelcomeSteps } from "../../components";

export const WelcomeScreen = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
      <WelcomeSteps activeMarker={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});