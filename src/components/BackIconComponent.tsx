import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import BackIcon from "../assets/icons/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks";

interface BackIconComponentProps {
  disabled?: boolean;
}

export const BackIconComponent: FC<BackIconComponentProps> = ({ disabled }) => {
  const navigation = useNavigation();
  const { colors: { secondary } } = useTheme();

  const onBack = () => {
    if (!disabled && navigation.canGoBack()) {
      navigation.goBack();
    }
  }
  return (
    <TouchableOpacity 
      style={{ opacity: disabled ? 0.5 : 1 }} 
      disabled={!!disabled} 
      onPress={onBack}
    >
      <BackIcon width={45} height={45} color={secondary} />
    </TouchableOpacity>
  )
}