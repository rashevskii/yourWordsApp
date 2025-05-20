import React, { FC, useEffect, useState } from "react";
import { 
  View 
} from "react-native";
import { globalStyles } from "../../styles";
import { useAppSettings, useTheme } from "../../hooks";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { BottomTabsParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import {
  SelectWords,
  HomeMenuComponent, 
  Loading, 
  MicrophoneComponent, 
  TranslationInputComponent,
} from "../../components";
import { translateText } from "../../api";
import { addWord } from "../../database";
import { errorHandler } from "../../helpers";
import { appEventEmitter, events } from "../../events";
import { LanguagesType, UILanguagesType } from "../../types";

type HomeNavigationProp = NativeStackNavigationProp<BottomTabsParamList, "Home">;
type HomeRouteProp = RouteProp<BottomTabsParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

export type Translation = {
  translations: string[];
  lang: LanguagesType | UILanguagesType;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors: { background } } = useTheme();
  const { baseContainer, containerPadding } = globalStyles;
  const { mainLanguage, additionalLanguage, nativeLanguage } = useAppSettings();
  const [sourceLang, setSourceLang] = useState<LanguagesType | UILanguagesType | null>(mainLanguage);
  const [firstTargetLang, setFirstTargetLang] = useState<LanguagesType | UILanguagesType | null>(additionalLanguage || nativeLanguage);
  const [secondTargetLang, setSecondTargetLang] = useState<LanguagesType | UILanguagesType | null>(additionalLanguage ? nativeLanguage : null);
  const [translatedText, setTranslatedText] = useState<Translation[]>([]);
  const [load, setLoad] = useState(false);
  const [sourceWord, setSourceWord] = useState("");

  useEffect(() => {
    appEventEmitter.addListener(events.MAIN_LANGUAGE_CHANGED, () => {
      const { mainLanguage } = useAppSettings();
      setSourceLang(mainLanguage)
    });
    appEventEmitter.addListener(events.ADDITIONAL_LANGUAGE_CHANGED, () => {
      const { additionalLanguage, nativeLanguage } = useAppSettings();
      setFirstTargetLang(additionalLanguage);
      setSecondTargetLang(nativeLanguage);
    });
    appEventEmitter.addListener(events.NATIVE_LANGUAGE_CHANGED, () => {
      const { additionalLanguage, nativeLanguage } = useAppSettings();
      if (!additionalLanguage) {
        setFirstTargetLang(nativeLanguage);
      } else {
        setSecondTargetLang(nativeLanguage);
      }
    });
    return () => appEventEmitter.removeAllListeners();
  }, []);

  const onChangeLanguage = () => {
    if (sourceLang === mainLanguage) {
      setSourceLang(additionalLanguage || nativeLanguage);
      setFirstTargetLang(mainLanguage);
    } else if (sourceLang === additionalLanguage) {
      setSourceLang(nativeLanguage);
      setFirstTargetLang(additionalLanguage);
      setSecondTargetLang(mainLanguage);
    } else if (sourceLang === nativeLanguage){
      setSourceLang(mainLanguage);
      setFirstTargetLang(additionalLanguage || nativeLanguage);
      setSecondTargetLang(nativeLanguage || null);
    }
  };

  const onTranslateText = async (text: string) => {
    setLoad(true);
    try {
      if (additionalLanguage) {
        Promise.all([
          await translateText({text, targetLang: firstTargetLang!, sourceLang: sourceLang!}),
          await translateText({text, targetLang: secondTargetLang!, sourceLang: sourceLang!})
        ])
          .then((resp) => {
            const firstTranslation = resp[0].translations.map(translation => translation.text);
            const secondTranslation = resp[1].translations.map(translation => translation.text);
            const data: Translation[] = [
              {
                lang: firstTargetLang!,
                translations: firstTranslation
              },
              {
                lang: secondTargetLang!,
                translations: secondTranslation
              }
            ];
            setSourceWord(text);
            setTranslatedText(data);
          });
      } else {
        await translateText({text, targetLang: firstTargetLang!, sourceLang: sourceLang!})
          .then((resp) => {
            const data = resp.translations.map(translation => translation.text);
            setSourceWord(text);
            setTranslatedText([{ lang: firstTargetLang!,  translations: data }]);
          });
      }
    } catch(error: any) {
      errorHandler({error});
    } finally {
      setLoad(false);
    }
   
  };

  const saveTranslation = async () => {
    setLoad(true);
    let source = 
      translatedText
        .find((translate) => translate.lang === mainLanguage)
        ?.translations[0] || sourceWord;
    let native = 
      translatedText
      .find((translate) => translate.lang === nativeLanguage)
      ?.translations[0] || sourceWord;
    let additional = 
      translatedText.length === 1 ? 
      null : 
      translatedText
        .find((translate) => translate.lang === additionalLanguage)
        ?.translations[0] || sourceWord;
    
    try {
      await addWord(
        source,
        native,
        additional,
        null,
        Date.now()
      );
      setTranslatedText([]);
    } catch(error: any) {
      errorHandler({ error });
    } finally {
      setLoad(false);
    }
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
      <TranslationInputComponent
        onChangeLanguage={onChangeLanguage}
        currentLang={sourceLang}
        onTranslate={onTranslateText}
      />
      <HomeMenuComponent onMyDictionary={onMyDictionary} />
      <SelectWords 
        translation={translatedText}
        saveTranslation={saveTranslation}
      />
      <MicrophoneComponent disabled={!!translatedText.length} />
      {load && <Loading />}
    </View>
  );

};
