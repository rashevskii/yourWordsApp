import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../assets/icons/arrow-left.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks";

export interface IWordsHeaderProps {
  folderName: string;
}

export const WordsHeaderComponent: FC<IWordsHeaderProps> = ({ folderName }) => {
  const navigation = useNavigation();
  const { colors: { text } } = useTheme();

  const onBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <BackIcon width={45} height={45} />
      </TouchableOpacity>
      <Text style={[styles.folderName, { color: text }]}>{folderName}</Text>
      <TouchableOpacity>
        <SettingsIcon width={45} height={45} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  folderName: {
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
    fontSize: 18,
    textTransform: "uppercase",
    paddingHorizontal: 10,
    flex: 1
  }
});