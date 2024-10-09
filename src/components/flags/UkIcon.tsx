import React, { FC } from "react";
import Uk from "../../assets/icons/uk.svg";
import { globalStyles } from "../../styles";
import { ViewStyle } from "react-native";

export interface UkIconProps {
  style?: ViewStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const UkIcon: FC<UkIconProps> = ({ style, iconWidth, iconHeight }) => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Uk width={iconWidth || width} height={iconHeight || height} style={style} />
  );
}