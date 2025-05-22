import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checked from "../assets/icons/checked.svg";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useTheme } from "../hooks";
import { LanguagesType, UILanguagesType } from "../types";

export interface SelectableLanguageProps {
  langKey: UILanguagesType | LanguagesType;
  Icon: FC;
  engName: string;
  selected: boolean;
  transletedName: string;
  onPress: (key: UILanguagesType | LanguagesType) => void;
  disabled?: boolean;
}

export const SelectableLanguage: FC<SelectableLanguageProps> = ({ 
  langKey, 
  Icon, 
  engName, 
  transletedName, 
  selected, 
  onPress, 
  disabled 
}) => {
  const { language } = useSelector((state: RootState) => state.appSettings);
  const { colors } = useTheme();
  return (
    <TouchableOpacity 
      style={[styles.container, { opacity: disabled ? .5 : 1 }]} 
      onPress={() => onPress(langKey)} 
      disabled={disabled}
    >
      <Icon />
      <View style={styles.textContainer}>
        <Text style={[styles.engName, { color: colors.text }]}>{engName}</Text>
        {language !== "en" && <Text style={[styles.transletedName, { color: colors.text }]}>{transletedName}</Text>}
      </View>
      <View style={styles.selected}>
        {selected && <Checked width={35} height={35} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 25,
    width: "100%"
  },
  textContainer: {
    marginLeft: 20
  },
  engName: {
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 30
  },
  transletedName: {
    textTransform: "lowercase",
    fontSize: 16,
    lineHeight: 16
  },
  selected: {
    alignSelf: "flex-start",
    marginLeft: "auto"
  }
});