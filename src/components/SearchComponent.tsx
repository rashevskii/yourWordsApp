import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import SearchIcon from "../assets/icons/search.svg";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";

export interface ISearchProps {
  onChangeText: (text: string) => void;
  value: string;
}

export const SearchComponent: FC<ISearchProps> = ({ onChangeText, value }) => {
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const { colors: { border, text } } = useTheme();

  return (
    <View style={[styles.inputContainer, { borderColor: border }]}>
      <SearchIcon width={25} height={25} />
      <TextInput 
        placeholder={t("Search")}
        style={[styles.input, { color: text }]}
        value={value}
        onChangeText={onChangeText}
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