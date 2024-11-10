import React, { FC } from "react";
import { View } from "react-native";
import { 
  AddFolderComponent, 
  FoldersListComponent,
} from "../../components";
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
  const { colors: { background } } = useTheme();
  const { baseContainer, containerPadding } = globalStyles;
  return (
    <View style={[baseContainer, containerPadding, { backgroundColor: background }]}>
      <FoldersListComponent />
      <AddFolderComponent onPress={() => {}} />
    </View>
  );
}
