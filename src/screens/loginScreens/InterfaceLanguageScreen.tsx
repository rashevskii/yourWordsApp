import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import { MainButton, SelectableLanguage, WelcomeSteps } from "../../components";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { AuthStackParamList } from "../../navigations";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RouteProp } from "@react-navigation/native";
import { LanguagesType, listOfUILanguages, UILanguagesType } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLanguage, setMainLanguage } from "../../store";

type InterfaceLanguageNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'InterfaceLanguage'>;
type InterfaceLanguageRouteProp = RouteProp<AuthStackParamList, 'InterfaceLanguage'>;

interface InterfaceLanguageProps {
  navigation: InterfaceLanguageNavigationProp;
  route: InterfaceLanguageRouteProp;
}

export const InterfaceLanguageScreen: FC<InterfaceLanguageProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.appSettings);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const onBack = () => {
    dispatch(setMainLanguage("en"));
    navigation.goBack();
  } 

  const onPressLanguage = (key: UILanguagesType | LanguagesType) => {
    dispatch(setLanguage(key as UILanguagesType));
    setSelectedLanguage(key as UILanguagesType);
  }

  const onNext = () => {
    dispatch(setMainLanguage(selectedLanguage as LanguagesType));
    navigation.navigate("MainLanguage");
  }

  return (
    <View style={[ globalStyles.baseContainer, { backgroundColor: colors.background }]}>
      <WelcomeSteps activeMarker={1} />
      <View style={styles.arrowTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft color={colors.secondary} width={40} height={40} />
        </TouchableOpacity>
        <Text style={[styles.selectText, { color: colors.text }]}>
          {t("Select interface language")}
        </Text>
      </View>
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
      <View style={styles.buttonContainer}>
        <MainButton text={t("Next")} onPress={onNext} disabled={!selectedLanguage || !selectedLanguage.length} />
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