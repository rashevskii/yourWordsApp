import React, { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import SearchIcon from "../assets/icons/search.svg";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";

export const SearchComponent: FC = () => {
  const { t } = useTranslation();
  const { colors: { border, text } } = useTheme();
  return (
    <View style={[styles.inputContainer, { borderColor: border }]}>
      <SearchIcon width={25} height={25} />
      <TextInput 
        placeholder={t("Search")}
        style={[styles.input, { color: text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
  },
  input: {
    width: 210, 
    fontSize: 18, 
    paddingLeft: 0,
    marginLeft: 10,
    paddingVertical: 0
  },
});