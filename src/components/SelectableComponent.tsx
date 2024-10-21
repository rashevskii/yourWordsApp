import React, { FC, ReactNode } from "react";
import { SelectItem, SelectItems } from "../types";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet } from "react-native";
import { useTheme } from "../hooks";

export interface ISelectableProps {
  items: SelectItems<string>;
  onValueChange: (value: SelectItem<string>) => void;
  renderButton: (selectedItem: any) => ReactNode;
  renderItem: (item: any) => ReactNode;
  defaultValue?:  SelectItem<string>;
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
  const { colors: { background } } = useTheme();
  return (
    <SelectDropdown 
      data={items}
      onSelect={onValueChange}
      renderButton={renderButton}
      renderItem={renderItem}
      defaultValue={defaultValue}
      disabled={disabled}
      dropdownStyle={{...styles.container,  backgroundColor: background }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  }
});

