import React, { FC } from "react";
import Sweden from "../../assets/icons/sweden.svg";
import { globalStyles } from "../../styles";
import { ViewStyle } from "react-native";

export interface SwedenIconProps {
  style?: ViewStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const SwedenIcon: FC<SwedenIconProps> = ({ style, iconWidth, iconHeight }) => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Sweden width={iconWidth || width} height={iconHeight || height} style={style} />
  );
}