import React, { FC } from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import { useTranslation } from "react-i18next";

type SettingsNavigationProp = NativeStackNavigationProp<MainStackParamList, "Settings">;
type SettingsRouteProp = RouteProp<MainStackParamList, "Settings">;

interface SettingsScreenProps {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
}

export const SettingsScreen: FC<SettingsScreenProps> = () => {
  const { colors: { background, border } } = useTheme();
  const { t } = useTranslation();
  const { baseContainer, containerPadding } = globalStyles;
  const {
    blockStyles
  } = styles;

  return (
    <View style={[
          baseContainer, 
          containerPadding, 
          { backgroundColor: background }
        ]}>
      <View style={[blockStyles, { borderColor: border }]}>
        <View>
          <Text>{t("Language being studied")}</Text>
          <TouchableOpacity><Text>English</Text></TouchableOpacity>
        </View>
      </View>
      <View style={[blockStyles, { borderColor: border }]}></View>
      <View style={[blockStyles, { borderColor: border }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  blockStyles: {
    borderWidth: 2,
    borderRadius: 10
  }
});