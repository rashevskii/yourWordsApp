import React from "react";
import Ukrain from "../../assets/icons/ukraine.svg";
import { globalStyles } from "../../styles";

export const UkrainIcon = () => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Ukrain width={width} height={height} />
  );
}