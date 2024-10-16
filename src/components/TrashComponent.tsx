import React, { FC } from "react";
import TrashIcon from "../assets/icons/trash.svg";

export interface ITrashProps {

}

export const TrashComponent: FC<ITrashProps> = () => {
  return (
    <TrashIcon width={25} height={25} />
  );
};