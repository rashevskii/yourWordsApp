import React, { FC, ReactNode } from "react";
import { SelectItem, SelectItems, LanguageItem } from "../types";
import SelectDropdown from "react-native-select-dropdown";

export interface ISelectableProps {
  items: SelectItems<LanguageItem[]>;
  onValueChange: (value: SelectItem<LanguageItem[]>) => void;
  renderButton: (selectedItem: any) => ReactNode;
  renderItem: (item: any) => ReactNode;
  defaultValue?:  SelectItem<LanguageItem[]>;
  disabled?: boolean;
}

export const SelectableComponent: FC<ISelectableProps> = ({ 
  items,
  renderButton,
  renderItem,
  disabled, 
  onValueChange,
  defaultValue
}) => {

  return (
    <SelectDropdown 
      data={items}
      onSelect={onValueChange}
      renderButton={renderButton}
      renderItem={renderItem}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
};

