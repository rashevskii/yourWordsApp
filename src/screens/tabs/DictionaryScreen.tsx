import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { 
  AddFolderComponent, 
  FoldersListComponent, 
  HeaderComponent,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { BottomTabsParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";

export type DictionaryNavigationProp = NativeStackNavigationProp<BottomTabsParamList, 'Dictionary'>;
export type MainLanguageRouteProp = RouteProp<BottomTabsParamList, 'Dictionary'>;

export interface IDictionaryProps {
  navigation: DictionaryNavigationProp;
  route: MainLanguageRouteProp;
}

export const DictionaryScreen: FC<IDictionaryProps> = () => {
  const { t } = useTranslation();
  const { colors: { background, text } } = useTheme();
  const { baseContainer, containerPadding } = globalStyles;
  return (
    <View style={[baseContainer, containerPadding, { backgroundColor: background }]}>
      <HeaderComponent />
      <Text style={[styles.text, { color: text }]}>{t("My dictionary")}</Text>
      <FoldersListComponent />
      <AddFolderComponent onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  }
});