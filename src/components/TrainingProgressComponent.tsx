import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

export interface ITrainingProgressComponentProps {
  percentage: number;
}

export const TrainingProgressComponent: FC<ITrainingProgressComponentProps> = ({ percentage }) => {
  const size = 30;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2; // Радиус круга
  const circumference = 2 * Math.PI * radius; // Длина окружности
  const progress = (percentage / 100) * circumference; // Длина дуги прогресса

  return (
    <View style={styles.container}>
      <Svg width={30} height={size}>
        {/* Синий круг (фон) */}
        <Circle
          stroke="#0000FF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Зеленый круг (прогресс) */}
        <Circle
          stroke="#00FF00"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* Текст с процентом */}
      {/* <View style={styles.textContainer}>
        <Text style={styles.text}>{`${percentage}%`}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});