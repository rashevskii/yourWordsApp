import React, { FC } from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import { SettingsLanguagesBlockComponent } from "../../components";

type SettingsNavigationProp = NativeStackNavigationProp<MainStackParamList, "Settings">;
type SettingsRouteProp = RouteProp<MainStackParamList, "Settings">;

interface SettingsScreenProps {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
}

export const SettingsScreen: FC<SettingsScreenProps> = () => {
  const { colors: { background, border } } = useTheme();
  const { baseContainer, containerPadding } = globalStyles;
  const {
    blockStyles,
  } = styles;

  return (
    <View style={[
      baseContainer, 
      containerPadding, 
      { backgroundColor: background }
    ]}>
      <SettingsLanguagesBlockComponent />

      <View style={[blockStyles, { borderColor: border }]}></View>

      <View style={[blockStyles, { borderColor: border }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  blockStyles: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
});