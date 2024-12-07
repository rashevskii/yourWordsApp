import React from "react";
import {
  StyleSheet, 
  Text, 
  View 
} from "react-native";
import { 
  WelcomeSteps,
  MainButton,
  AllLanguages,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";

export const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const onNext = () => {
    navigation.navigate("InterfaceLanguage");
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