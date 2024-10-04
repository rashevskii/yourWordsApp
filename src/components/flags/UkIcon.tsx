import React from "react";
import Uk from "../../assets/icons/uk.svg";
import { globalStyles } from "../../styles";

export const UkIcon = () => {
  const { width, height } = globalStyles.baseFlagsIconSize;
  return (
    <Uk width={width} height={height} />
  );
}