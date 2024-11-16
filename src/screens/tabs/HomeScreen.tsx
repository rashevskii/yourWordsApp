import React, { FC, useState } from "react";
import { 
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
  SelectWords,
  HeaderComponent, 
  HomeMenuComponent, 
  Loading, 
  MicrophoneComponent, 
  TranslationInputComponent 
} from "../../components";
import { translateAdditionalText, translateText } from "../../api";
import { LanguagesType, UILanguagesType } from "../../data";
import { useTranslation } from "react-i18next";
import { addWord } from "../../database";
import { errorHandler } from "../../helpers";

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
  const { t } = useTranslation();
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
            const slowdown = resp.find(item => ("error" in item));
            if (slowdown) {
              Alert.alert(
                t("Attention"),
                slowdown.error as string
              )
              return;
            }
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
          if ("error" in resp) {
            Alert.alert(
              t("Attention"),
              resp.error as string
            )
            return;
          }
          setSourceWord(text);
          setTranslatedText([resp]);
        });
      }
    } catch(error: any) {
      errorHandler({error});
    } finally {
      setLoad(false);
    }
   
  };

  const saveTranslation = async (
    originalWord: string,
    nativeTranslation: string,
    additionalTranslation: string | null,
    groupId: string | null,
    addedDate: string
  ) => {
    try {
      setLoad(true);
      await addWord(
        originalWord,
        nativeTranslation,
        additionalTranslation,
        groupId,
        addedDate
      );
    } catch(error: any) {
      errorHandler({ error });
    } finally {
      setLoad(false);
    }
  }

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
      <SelectWords 
        translations={translatedText} 
        sourceWord={sourceWord}
        changedLanguages={changedLang}
        clearTranslate={clearTranslate}
        saveTranslation={saveTranslation}
      />
      <MicrophoneComponent disabled={!!translatedText.length} />
      {load && <Loading />}
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
