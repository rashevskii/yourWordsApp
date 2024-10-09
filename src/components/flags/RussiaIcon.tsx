import React, { FC } from "react";
import Russia from "../../assets/icons/russia.svg";
import { globalStyles } from "../../styles";
import { ViewStyle } from "react-native";

export interface RussiaIconProps {
  style?: ViewStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const RussiaIcon: FC<RussiaIconProps> = ({ style, iconWidth, iconHeight }) => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Russia width={iconWidth || width} height={iconHeight || height} style={style} />
  );
}