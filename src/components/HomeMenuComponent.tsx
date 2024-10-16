import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MicrophoneIcon from "../assets/icons/microphone.svg";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";

export interface IHomeMenuProps {
  onMyDictionary: () => void;
}

export const HomeMenuComponent: FC<IHomeMenuProps> = ({ onMyDictionary }) => {
  const { colors: { text } } = useTheme();
  const { t } = useTranslation();
  return (
    <>
      <TouchableOpacity onPress={onMyDictionary}>
        <Text style={[styles.myDictionary, { color: text }]}>{t("My dictionary")}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  myDictionary: {
    fontSize: 26,
    fontWeight: "bold"
  }
});