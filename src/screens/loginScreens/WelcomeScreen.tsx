import React from "react";
import {
  StyleSheet, 
  Text, 
  View 
} from "react-native";
import { 
  WelcomeSteps,
  MainButton,
  AllLanguages
} from "../../components";
import { useTranslation } from "react-i18next";

export const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <WelcomeSteps activeMarker={0} />
      <AllLanguages />
      <View>
        <Text>{t("Welcome in")}</Text>
        <Text>Your Words</Text>
        <Text>{t("Welcome text")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton text={t("Next")} onPress={() => {}} />
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
  }
});