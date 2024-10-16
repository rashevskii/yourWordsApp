import React, { FC, useState } from "react";
import { 
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
  HeaderComponent, 
  HomeMenuComponent, 
  MicrophoneComponent, 
  TranslationInputComponent 
} from "../../components";

type HomeNavigationProp = NativeStackNavigationProp<BottomTabsParamList, "Home">;
type HomeRouteProp = RouteProp<BottomTabsParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors: { background, text, secondary } } = useTheme();
  const { baseContainer, containerPadding } = globalStyles;
  const { mainLanguage, additionalLanguage } = useSelector((state: RootState) => state.appSettings);
  const [currentLang, setCurrentLang] = useState(mainLanguage);

  const onChangeLanguage = () => {
    if (currentLang === mainLanguage) {
      setCurrentLang(additionalLanguage);
    } else {
      setCurrentLang(mainLanguage);
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
      <HeaderComponent />
      <Text style={[styles.words, { color: text }]}>WORDS</Text>
      <TranslationInputComponent 
        additionalLanguage={additionalLanguage}
        onChangeLanguage={onChangeLanguage}
        currentLang={currentLang}
      />
      <HomeMenuComponent onMyDictionary={onMyDictionary} />
      <MicrophoneComponent />
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
