import React, { FC, useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles";
import { useTheme } from "../hooks";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../navigations";
import { RouteProp } from "@react-navigation/native";
import { SearchComponent, SelectableComponent, WordsHeaderComponent } from "../components";
import { useLanguagesItems } from "../hooks/useLanguagesItems";
import { LanguageItem, SelectItem } from "../types";

type WordsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Words'>;
type MainLanguageRouteProp = RouteProp<MainStackParamList, 'Words'>;

export interface IWordsProps {
  navigation: WordsNavigationProp;
  route: MainLanguageRouteProp;
}



export const WordsScreen: FC<IWordsProps> = ({ route: { params: { 
  folderName,
  idFolder
 } } }) => {
  const { containerPadding, baseContainer } = globalStyles;
  const { colors: { background } } = useTheme();
  const items = useMemo(() => useLanguagesItems(), []);
  const [selectedValue, setSelectedValue] = useState(items[0]);

  const selectButton = (selectedItem: SelectItem<LanguageItem[]>) => {
    return (
      <View>
        <Text>
          {selectedItem && selectedItem.label}
        </Text>
      </View>
    );
  }
  
  const selectItem = (item: SelectItem<LanguageItem[]>) => {
    return (
      <View>
        <Text>{item.label}</Text>
      </View>
    );
  }


  const onSelectLanguages = useCallback((value: SelectItem<LanguageItem[]>) => {
    setSelectedValue(value);
  }, []);
  

  return (
    <View 
      style={[
        baseContainer, 
        containerPadding, 
        { backgroundColor: background }
      ]}
    >
      <WordsHeaderComponent folderName={folderName} />
      <SearchComponent />
      <SelectableComponent 
        items={items} 
        renderButton={selectButton}
        renderItem={selectItem}
        onValueChange={onSelectLanguages}
        defaultValue={selectedValue}
        disabled={items.length === 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
});