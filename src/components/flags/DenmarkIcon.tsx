import React from "react";
import Denmark from "../../assets/icons/denmark.svg";
import { globalStyles } from "../../styles";

export const DenamrkIcon = () => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Denmark width={width} height={height} />
  );
}