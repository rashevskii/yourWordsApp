import React from "react";
import Norway from "../../assets/icons/norway.svg";
import { globalStyles } from "../../styles";

export const NorwayIcon = () => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Norway width={width} height={height} />
  );
}