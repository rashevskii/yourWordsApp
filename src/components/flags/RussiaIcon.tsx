import React from "react";
import Russia from "../../assets/icons/russia.svg";
import { globalStyles } from "../../styles";

export const RussiaIcon = () => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Russia width={width} height={height} />
  );
}