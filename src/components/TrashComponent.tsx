import React, { FC } from "react";
import TrashIcon from "../assets/icons/trash.svg";
import { useTheme } from "../hooks";

export interface ITrashProps {
  color?: string; 
}

export const TrashComponent: FC<ITrashProps> = ({ color }) => {
  const { colors: { secondary } } = useTheme();
  return (
    <TrashIcon width={25} height={25} color={color || secondary} />
  );
};