import React, { FC } from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { globalStyles } from "../styles";

interface CircleComponentProps {
  fill: ColorValue
}

export const CircleComponent: FC<CircleComponentProps> = ({ fill }) => {
  return (
    <View style={[globalStyles.baseContainer, styles.container]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Circle 
          cx="50"
          cy="50"
          r="46"
          fill={fill}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 23
  }
});
