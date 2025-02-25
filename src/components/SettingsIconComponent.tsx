import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import SettingsIcon from "../assets/icons/settings.svg";
import { useTheme } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../navigations";
import { StackNavigationProp } from "@react-navigation/stack";

type MainStackNavProp = StackNavigationProp<MainStackParamList, 'Settings'>;

export const SettingsIconComponent: FC = () => {
  const { colors: { secondary } } = useTheme();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <SettingsIcon width={35} height={35} color={secondary} />
    </TouchableOpacity>
  )
}