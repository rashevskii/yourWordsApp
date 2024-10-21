import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import PlanetIcon from "../assets/icons/planet.svg";
import { useTheme } from "../hooks";

export const PlanetIconComponent: FC = () => {
  const { colors: { secondary } } = useTheme();
  return (
    <TouchableOpacity>
      <PlanetIcon width={35} height={35} color={secondary} />
    </TouchableOpacity>
  )
}