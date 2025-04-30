import React, { useState } from "react";
import { SelectItem, SelectItems } from "../types";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks";
import { View, ActivityIndicator } from "react-native";
import { Menu, Button } from "react-native-paper";

export interface ISelectableProps<T> {
  items: SelectItems<T>;
  onValueChange: (value: SelectItem<T>) => void;
  renderButton?: (selectedItem: SelectItem<T> | null) => React.ReactNode;
  renderItem?: (item: SelectItem<T>) => React.ReactNode;
  defaultValue?: SelectItem<T>;
  disabled?: boolean;
  loading?: boolean;
}

export const SelectableComponent = <T,>({
  items,
  onValueChange,
  renderButton,
  renderItem,
  defaultValue,
  disabled = false,
  loading = false,
}: ISelectableProps<T>) => {
  const { colors: { text, background } } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectItem<T> | null>(defaultValue ?? null);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSelect = (item: SelectItem<T>) => {
    onValueChange(item);
    setSelectedItem(item);
    closeMenu();
  };

  return (
    <View style={styles.wrapper}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="text"
            onPress={openMenu}
            disabled={disabled || loading}
            contentStyle={{ justifyContent: "space-between", alignItems: "center" }}
            icon={menuVisible ? "chevron-up" : "chevron-down"}
          >
            {
              loading ? 
              <ActivityIndicator size="small" /> : 
              renderButton ? renderButton(selectedItem) : 
              <Text style={{ color: text }}>{selectedItem?.label}</Text>
            }
          </Button>
        }
        style={styles.menu}
        contentStyle={{ backgroundColor: background }}
      >
        {items.map((item, index) => (
          <Menu.Item
            key={index}
            onPress={() => handleSelect(item)}
            title={renderItem ? renderItem(item) : item.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "stretch",
  },
  menu: {
    marginTop: 4,
    borderRadius: 8,
  },
});
