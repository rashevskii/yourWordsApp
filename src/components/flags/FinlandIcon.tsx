import React, { FC } from "react";
import Finland from "../../assets/icons/finland.svg";
import { globalStyles } from "../../styles";
import { ViewStyle } from "react-native";

export interface FinlandIconProps {
  style?: ViewStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const FinlandIcon: FC<FinlandIconProps> = ({ style, iconWidth, iconHeight }) => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Finland width={iconWidth || width} height={iconHeight || height} style={style} />
  );
}