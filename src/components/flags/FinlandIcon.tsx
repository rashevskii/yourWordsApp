import React from "react";
import Finland from "../../assets/icons/finland.svg";
import { globalStyles } from "../../styles";

export const FinlandIcon = () => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Finland width={width} height={height} />
  );
}