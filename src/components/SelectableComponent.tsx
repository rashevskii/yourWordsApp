import React, { FC, ReactNode } from "react";
import { SelectItem, SelectItems } from "../types";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet } from "react-native";
import { useTheme } from "../hooks";

export interface ISelectableProps<T> {
  items: SelectItems<T>;
  onValueChange: (value: SelectItem<T>) => void;
  renderButton: (selectedItem: SelectItem<T>) => ReactNode;
  renderItem: (item: SelectItem<T>) => ReactNode;
  defaultValue?:  SelectItem<T>;
  disabled?: boolean;
}

export const SelectableComponent = <T,>({ 
  items,
  renderButton,
  renderItem,
  disabled, 
  onValueChange,
  defaultValue
}: ISelectableProps<T>) => {
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

