import React, { FC } from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";

type SettingsNavigationProp = NativeStackNavigationProp<MainStackParamList, "Settings">;
type SettingsRouteProp = RouteProp<MainStackParamList, "Settings">;

interface SettingsScreenProps {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
}

export const SettingsScreen: FC<SettingsScreenProps> = () => {
  const { colors: { background } } = useTheme();
  const { baseContainer, containerPadding } = globalStyles;

  return (
    <View style={[
          baseContainer, 
          containerPadding, 
          { backgroundColor: background }
        ]}>
    </View>
  );
}