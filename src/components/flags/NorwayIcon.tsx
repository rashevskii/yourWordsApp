import React, { FC } from "react";
import Norway from "../../assets/icons/norway.svg";
import { globalStyles } from "../../styles";
import { ViewStyle } from "react-native";

export interface NorwayIconProps {
  style?: ViewStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const NorwayIcon: FC<NorwayIconProps> = ({ style, iconWidth, iconHeight }) => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Norway width={iconWidth || width} height={iconHeight || height} style={style} />
  );
}