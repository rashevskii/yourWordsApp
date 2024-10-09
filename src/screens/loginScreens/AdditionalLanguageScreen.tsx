import React, { FC, useState } from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AuthStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";
import { LanguagesType, listOfLanguages, UILanguagesType } from "../../data";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainButton, SelectableLanguage, WelcomeSteps } from "../../components";
import { globalStyles } from "../../styles";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setAdditionaLanguage } from "../../store";

type AdditionalLanguageNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'AdditionalLanguage'>;
type AdditionalLanguageRouteProp = RouteProp<AuthStackParamList, 'AdditionalLanguage'>;

interface AdditionalLanguageProps {
  navigation: AdditionalLanguageNavigationProp;
  route: AdditionalLanguageRouteProp;
}

export const AdditionalLanguageScreen: FC<AdditionalLanguageProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { mainLanguage, additionalLanguage } = useSelector((state: RootState) => state.appSettings);
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState(additionalLanguage);

  const onBack = () => {
    dispatch(setAdditionaLanguage(null));
    navigation.goBack();
  } 

  const onPressLanguage = (key: LanguagesType | UILanguagesType) => {
    setSelectedLanguage(key as LanguagesType);
  }

  const onNext = () => {
    dispatch(setAdditionaLanguage(selectedLanguage as LanguagesType));
    navigation.navigate("NativeLanguage");
  }

  const onSkip = () => {
    setSelectedLanguage(null);
    dispatch(setAdditionaLanguage(null));
    navigation.navigate("NativeLanguage");
  }

  return (
    <View style={[ globalStyles.baseContainer, { backgroundColor: colors.background }]}>
      <WelcomeSteps activeMarker={2} />
      <View style={styles.arrowTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft width={40} height={40} />
        </TouchableOpacity>
        <Text style={[styles.selectText, { color: colors.text }]}>{t("Select additional language")}</Text>
      </View>
      <View style={styles.languagesContainer}>
        {
          listOfLanguages.map(
            ({ key, icon, engName, translatedName }) => <SelectableLanguage 
              langKey={key}
              key={key}
              Icon={icon} 
              engName={engName} 
              transletedName={translatedName} 
              selected={key === selectedLanguage}
              onPress={onPressLanguage}
              disabled={key === mainLanguage} />
            )
        }
      </View>
      <View style={styles.buttonContainer}>
        <MainButton text={t("Next")} onPress={onNext} disabled={!selectedLanguage || !selectedLanguage.length} />
        <MainButton text={t("Skip")} onPress={onSkip} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  backButton: {
    margin: 10
  },
  selectText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    width: "80%"
  },
  languagesContainer: {
    paddingHorizontal: 25,
    marginTop: 40
  },
  buttonContainer: {
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 50,
    left: 0,
    width: "100%"
  },
});