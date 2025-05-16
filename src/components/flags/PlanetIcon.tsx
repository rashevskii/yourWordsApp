import { FC } from "react";
import { ViewStyle } from "react-native";
import { globalStyles } from "../../styles";
import Planet from "../../assets/icons/planet.svg";
import { useTheme } from "../../hooks";

export interface PlanetIconProps {
  style?: ViewStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const PlanetIcon: FC<PlanetIconProps> = ({ style, iconWidth, iconHeight }) => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  const { colors: { secondary } } = useTheme();
  return (
    <Planet 
      width={iconWidth || width} 
      height={iconHeight || height} 
      style={style} 
      color={secondary} 
    />
  );
}
