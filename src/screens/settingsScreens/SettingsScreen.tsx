import React, { FC, useState } from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useHeader, useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import {
  BackIconComponent,
  HeaderComponent,
  Loading,
  SettingsAppBlockComponent,
  SettingsLanguagesBlockComponent
} from "../../components";
import { useTranslation } from "react-i18next";

type SettingsNavigationProp = NativeStackNavigationProp<MainStackParamList, "Settings">;
type SettingsRouteProp = RouteProp<MainStackParamList, "Settings">;

interface SettingsScreenProps {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
}

export const SettingsScreen: FC<SettingsScreenProps> = () => {
  const { t } = useTranslation();
  const { colors: { background, border } } = useTheme();
  const { baseContainer, containerPadding } = globalStyles;
  const {
    blockStyles,
  } = styles;
  const [loading, setLoading] = useState(false);
  useHeader({
    header: () => (
      <HeaderComponent
        title={t("Settings")}
        leftIcon={() => <BackIconComponent disabled={loading} />}
      />
    )
  });

  return (
    <>
      <View style={[
        baseContainer,
        containerPadding,
        { backgroundColor: background }
      ]}>
        <SettingsLanguagesBlockComponent setLoading={setLoading} />

        <SettingsAppBlockComponent />

        <View style={[blockStyles, { borderColor: border }]}></View>
      </View>
      {loading && <Loading />}
    </>
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