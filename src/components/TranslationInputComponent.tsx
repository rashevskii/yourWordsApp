import React, { FC, useState } from "react";
import { 
  Keyboard,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import SearchIcon from "../assets/icons/search.svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks";
import { LanguagesType } from "../data";

export interface ITranslationInputProps {
  additionalLanguage: LanguagesType | null;
  onChangeLanguage: () => void;
  currentLang: LanguagesType | null;
  onTranslate: (text: string) => Promise<void>;
}

export const TranslationInputComponent: FC<ITranslationInputProps> = ({ 
  additionalLanguage, 
  onChangeLanguage, 
  currentLang,
  onTranslate
}) => {
  const { t } = useTranslation();
  const { colors: { border, text, secondary, invertedText } } = useTheme();
  const [query, setQuery] = useState("");

  const getTranslation = (text: string) => {
    if (text.length > 0) {
      Keyboard.dismiss();
      onTranslate(text);
      setQuery("");
    }
  }

  return (
    <View style={[styles.inputContainer, { borderColor: border }]}>
      <TouchableOpacity 
        style={[
          styles.langButton, 
          { 
            backgroundColor: secondary, 
            opacity: additionalLanguage && additionalLanguage.length ? 1 : 0.5
          }
        ]} 
        onPress={onChangeLanguage}
        disabled={additionalLanguage && additionalLanguage.length ? false : true}
      >
        <Text style={[styles.langName, { color: invertedText }]}>{currentLang}</Text>
      </TouchableOpacity>
      <TextInput 
        placeholder={t("Enter word for translation")}
        style={[styles.input, { color: text }]}
        value={query}
        onChangeText={(e) => setQuery(e)}
        onSubmitEditing={(event) => getTranslation(event.nativeEvent.text)}
        inputMode="text"
        returnKeyType={"done"}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.searchButton} onPress={() => getTranslation(query)}>
        <SearchIcon width={25} height={25} />
      </TouchableOpacity>
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
    marginVertical: 20,
  },
  langButton: {
    height: 50,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  langName: {
    textTransform: "uppercase",
    fontSize: 20
  },
  searchButton: {
    marginLeft: "auto",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    width: 210, 
    fontSize: 18, 
    paddingLeft: 0,
    marginLeft: 10,
    paddingVertical: 0
  },
});