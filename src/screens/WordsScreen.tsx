import React, { FC, useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles";
import { useTheme } from "../hooks";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../navigations";
import { RouteProp } from "@react-navigation/native";
import {  
  SearchComponent, 
  SelectableComponent,
} from "../components";
import { SelectItem } from "../types";
import { useTranslation } from "react-i18next";
import ArrowDownIcon from "../assets/icons/arrow-down.svg";
import ArrowUpIcon from "../assets/icons/arrow-up.svg";

type WordsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Words'>;
export type WordsRouteProp = RouteProp<MainStackParamList, 'Words'>;

export interface IWordsProps {
  navigation: WordsNavigationProp;
  route: WordsRouteProp;
}



export const WordsScreen: FC<IWordsProps> = ({ route: { params: { 
  idFolder
 } } }) => {
  const { t } = useTranslation();
  const sortItems = useMemo(() => [
    { label: t("Date added"), value: "dateAsc" },
    { label: t("Date added"), value: "dateDesc" },
    { label: t("Alphabet"), value: "alphabetAsc" },
    { label: t("Alphabet"), value: "alphabetDesc" }
  ], []);
  const { containerPadding, baseContainer } = globalStyles;
  const { colors: { background, secondary, invertedText, text } } = useTheme();
  const [selectedValue, setSelectedValue] = useState(sortItems[0]);

  const selectButton = (selectedItem: SelectItem<string>) => {
    return (
      <View style={[styles.selectButton, { backgroundColor: secondary  }]}>
        <Text style={[styles.selectButtonText, { color: invertedText }]}>
          {selectedItem && selectedItem.label}
        </Text>
        {
          selectedItem && selectedItem.value.includes("Desc") ? 
          <ArrowDownIcon width={25} height={25} color={invertedText} /> : 
          <ArrowUpIcon width={25} height={25} color={invertedText} />
        }
      </View>
    );
  }
  
  const selectItem = (item: SelectItem<string>) => {
    return (
      <View style={styles.selectItem}>
        <Text style={[styles.selectItemText, { color: text }]}>{item.label}</Text>
        {
          item.value.includes("Desc") ? 
          <ArrowDownIcon width={25} height={25} color={text} /> : 
          <ArrowUpIcon width={25} height={25} color={text} />
        }
      </View>
    );
  }


  const onSelectLanguages = useCallback((value: SelectItem<string>) => {
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
      <SearchComponent />
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>{t("Sort by")}</Text>
        <SelectableComponent 
          items={sortItems} 
          renderButton={selectButton}
          renderItem={selectItem}
          onValueChange={onSelectLanguages}
          defaultValue={selectedValue}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  sortLabel: {
    fontSize: 18,
    paddingVertical: 5,
    marginRight: 10
  },
  selectButton: { 
    borderRadius: 20, 
    paddingHorizontal: 15, 
    paddingVertical: 5, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 180
  },
  selectButtonText: { 
    fontSize: 16 
  },
  selectItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  selectItemText: {
    fontSize: 16
  }
});