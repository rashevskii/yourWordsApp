import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { LanguagesType, listOfUILanguages, UILanguagesType } from "../../data";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AuthStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { MainButton, SelectableLanguage, WelcomeSteps } from "../../components";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { globalStyles } from "../../styles";
import { RootState, setNativeLanguge } from "../../store";

type NativeLanguageNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'NativeLanguage'>;
type NativeLanguageRouteProp = RouteProp<AuthStackParamList, 'NativeLanguage'>;

interface NativeLanguageProps {
  navigation: NativeLanguageNavigationProp;
  route: NativeLanguageRouteProp;
}

export const NativeLanguageScreen: FC<NativeLanguageProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { nativeLanguage } = useSelector((state: RootState) => state.appSettings);
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState(nativeLanguage);

  const onBack = () => {
    dispatch(setNativeLanguge(null));
    navigation.goBack();
  } 

  const onPressLanguage = (key: LanguagesType | UILanguagesType) => {
    setSelectedLanguage(key as UILanguagesType);
  }

  const onNext = () => {
    dispatch(setNativeLanguge(selectedLanguage as UILanguagesType));
    navigation.navigate("SetNotification");
  }
  return (
    <View style={[ globalStyles.baseContainer, { backgroundColor: colors.background }]}>
      <WelcomeSteps activeMarker={3} />
      <View style={styles.arrowTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft width={40} height={40} />
        </TouchableOpacity>
        <Text style={[styles.selectText, { color: colors.text }]}>{t("Select native language")}</Text>
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
              onPress={onPressLanguage}/>
            )
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