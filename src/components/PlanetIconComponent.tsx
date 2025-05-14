import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import PlanetIcon from "../assets/icons/planet.svg";
import { useTheme } from "../hooks";

interface PlanetIconComponentProps {
  disabled?: boolean;
}

export const PlanetIconComponent: FC<PlanetIconComponentProps> = ({ disabled }) => {
  const { colors: { secondary } } = useTheme();
  return (
    <TouchableOpacity style={{ opacity: disabled ? 0.5 : 1 }} disabled={!!disabled} >
      <PlanetIcon width={35} height={35} color={secondary} />
    </TouchableOpacity>
  )
}