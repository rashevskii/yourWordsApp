import React from "react";
import Sweden from "../../assets/icons/sweden.svg";
import { globalStyles } from "../../styles";

export const SwedenIcon = () => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Sweden width={width} height={height} />
  );
}