import React, { FC } from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import { useTranslation } from "react-i18next";
import { SettingsItemComponent, UkIcon } from "../../components";
import { RussiaIcon } from "../../components";

type SettingsNavigationProp = NativeStackNavigationProp<MainStackParamList, "Settings">;
type SettingsRouteProp = RouteProp<MainStackParamList, "Settings">;

interface SettingsScreenProps {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
}

export const SettingsScreen: FC<SettingsScreenProps> = () => {
  const { colors: { background, border, text } } = useTheme();
  const { t } = useTranslation();
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
      <View style={[blockStyles, { borderColor: border }]}>

        <SettingsItemComponent
          Icon={UkIcon}
          itemName={t("Language being studied")}
          Component={() => <Text>English</Text>}
        />

        <SettingsItemComponent
          Icon={RussiaIcon}
          itemName={t("Native language")}
          Component={() => <Text>Русский</Text>}
        />
        
        <SettingsItemComponent
          Icon={RussiaIcon}
          itemName={t("Application language")}
          Component={() => <Text>Русский</Text>}
        />

      </View>

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