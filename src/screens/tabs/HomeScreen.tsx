import React, { FC, useCallback, useState } from "react";
import { 
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View 
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { globalStyles } from "../../styles";
import { useTheme } from "../../hooks";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { BottomTabsParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import {
  BottomSheetComponent,
  HeaderComponent, 
  HomeMenuComponent, 
  MicrophoneComponent, 
  TranslationInputComponent 
} from "../../components";
import { translateAdditionalText, translateText } from "../../api";
import { LanguagesType, UILanguagesType } from "../../data";

type HomeNavigationProp = NativeStackNavigationProp<BottomTabsParamList, "Home">;
type HomeRouteProp = RouteProp<BottomTabsParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

export type Translations = {
  alternatives: string[];
  translatedText: string;
  lang?: LanguagesType | UILanguagesType;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors: { background, text } } = useTheme();
  const { baseContainer, containerPadding } = globalStyles;
  const { mainLanguage, additionalLanguage, nativeLanguage } = useSelector((state: RootState) => state.appSettings);
  const [currentLang, setCurrentLang] = useState(mainLanguage);
  const [changedLang, setChangedLang] = useState(false);
  const [translatedText, setTranslatedText] = useState<Translations[]>([]);
  const [load, setLoad] = useState(false);
  const [sourceWord, setSourceWord] = useState("");

  const onChangeLanguage = () => {
    if (currentLang === mainLanguage) {
      setCurrentLang(additionalLanguage);
      setChangedLang(true);
    } else {
      setCurrentLang(mainLanguage);
      setChangedLang(false)
    }
  };

  const onTranslateText = async (text: string) => {
    setLoad(true);
    try {
      if (additionalLanguage) {
        const targetLang = changedLang ? mainLanguage : additionalLanguage;
        Promise.all([
          await translateAdditionalText({text, targetLang: targetLang!, sourceLang: currentLang!}),
          await translateText({text, targetLang: nativeLanguage!, sourceLang: currentLang!})
        ])
          .then((resp) => { // {"error": "Slowdown: 5 per 1 minute"}
            const data = resp.map((item, index) => {
              if (index === 0) {
                return { lang: targetLang, ...item } as Translations
              } else {
                return { lang: nativeLanguage, ...item } as Translations
              }
            });
            
            setSourceWord(text);
            setTranslatedText(data);
          });
      } else {
        await translateText({text, targetLang: nativeLanguage!, sourceLang: currentLang!})
        .then((resp) => {
          setSourceWord(text);
          setTranslatedText([resp]);
        });
      }
    } catch(error: any) {
      Alert.alert("Ошибка", error);
    } finally {
      setLoad(false);
    }
   
  };

  const clearTranslate = () => {
    setTranslatedText([]);
  }

  const onMyDictionary = () => {
    navigation.navigate("Dictionary");
  }

  return (
    <View style={[
      baseContainer, 
      containerPadding, 
      { backgroundColor: background }
    ]}>
      <HeaderComponent />
      <Text style={[styles.words, { color: text }]}>WORDS</Text>
      <TranslationInputComponent 
        additionalLanguage={additionalLanguage}
        onChangeLanguage={onChangeLanguage}
        currentLang={currentLang}
        onTranslate={onTranslateText}
      />
      <HomeMenuComponent onMyDictionary={onMyDictionary} />
      <BottomSheetComponent 
        translations={translatedText} 
        sourceWord={sourceWord}
        changedLanguages={changedLang}
        clearTranslate={clearTranslate}
      />
      <MicrophoneComponent disabled={!!translatedText.length} />
      {load && <ActivityIndicator />}
    </View>
  );

};

const styles = StyleSheet.create({
  words: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 8,
    textAlign: "center"
  },
});
