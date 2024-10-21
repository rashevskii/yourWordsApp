import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import SettingsIcon from "../assets/icons/settings.svg";
import { useTheme } from "../hooks";
import { useNavigation } from "@react-navigation/native";

export const SettingsIconComponent: FC = () => {
  const { colors: { secondary } } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {}}>
      <SettingsIcon width={35} height={35} color={secondary} />
    </TouchableOpacity>
  )
}