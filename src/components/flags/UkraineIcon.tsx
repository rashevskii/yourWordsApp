import React from "react";
import Ukraine from "../../assets/icons/ukraine.svg";
import { globalStyles } from "../../styles";

export const UkraineIcon = () => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Ukraine width={width} height={height} />
  );
}