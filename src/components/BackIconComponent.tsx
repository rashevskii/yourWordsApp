import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import BackIcon from "../assets/icons/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks";

export const BackIconComponent: FC = () => {
  const navigation = useNavigation();
  const { colors: { secondary } } = useTheme();

  const onBack = () => {
    navigation.goBack();
  }
  return (
    <TouchableOpacity onPress={onBack}>
      <BackIcon width={45} height={45} color={secondary} />
    </TouchableOpacity>
  )
}