import React, { useState } from "react";
import {
  StyleSheet, 
  Text, 
  View 
} from "react-native";
import { 
  WelcomeSteps,
  MainButton,
  AllLanguages,
  SelectableLanguage
} from "../../components";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import { LanguagesType, listOfUILanguages, UILanguagesType } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLanguage } from "../../store";

export const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { language } = useSelector((state: RootState) => state.appSettings);
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const onNext = () => {
    navigation.navigate("MainLanguage");
  }

  const onPressLanguage = (key: UILanguagesType | LanguagesType) => {
    dispatch(setLanguage(key as UILanguagesType));
    setSelectedLanguage(key as UILanguagesType);
  }

  return (
    <View style={[ 
      globalStyles.baseContainer, 
      { backgroundColor: colors.background }
    ]}>
      <WelcomeSteps activeMarker={0} />
      <AllLanguages />
      <View style={styles.textContainer}>
        <Text style={[
          styles.baseText, 
          styles.welcomeText, 
          { color: colors.text }
          ]}>{t("Welcome in")}</Text>
        <Text style={[
          styles.baseText, 
          styles.yourWords, 
          { color: colors.text }
          ]}>Your Words</Text>
        <Text style={[
          styles.baseText, 
          styles.appDescription, 
          { color: colors.text }
          ]}>{t("Welcome text")}</Text>
      </View>
      <View>
        <Text style={[styles.selectText, { color: colors.text }]}>
          {t("Select interface language")}
        </Text>
        <View style={styles.languagesContainer}>
          {
            listOfUILanguages.map(
              ({ key, icon, engName, translatedName }) => <SelectableLanguage
                langKey={key}
                key={key}
                Icon={icon}
                engName={engName}
                transletedName={translatedName}
                selected={key === selectedLanguage}
                onPress={onPressLanguage}
              />)
          }
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton text={t("Next")} onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 50,
    left: 0,
    width: "100%"
  },
  baseText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 30,
  },
  yourWords: {
    fontSize: 45,
    letterSpacing: 3,
    opacity: .37,
    marginVertical: 20
  },
  appDescription: {
    fontSize: 22
  },
  textContainer: {
    marginTop: 15,
    paddingHorizontal: 5
  },
  languagesContainer: {
    paddingHorizontal: 25,
  },
  selectText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 25,
    paddingVertical: 25
  },
});