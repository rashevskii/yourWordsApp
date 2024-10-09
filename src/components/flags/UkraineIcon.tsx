import React, { FC } from "react";
import Ukraine from "../../assets/icons/ukraine.svg";
import { globalStyles } from "../../styles";
import { ViewStyle } from "react-native";

export interface UkraineIconProps {
  style?: ViewStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const UkraineIcon: FC<UkraineIconProps> = ({ style, iconWidth, iconHeight }) => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Ukraine width={iconWidth || width} height={iconHeight || height} style={style} />
  );
}