import React, { FC } from "react";
import Denmark from "../../assets/icons/denmark.svg";
import { globalStyles } from "../../styles";
import { ViewStyle } from "react-native";

export interface DenamrkIconProps {
  style?: ViewStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const DenamrkIcon: FC<DenamrkIconProps> = ({ style, iconWidth, iconHeight }) => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Denmark width={iconWidth || width} height={iconHeight || height} style={style} />
  );
}