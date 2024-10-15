import React, { FC, useState } from "react";
import { 
  StyleSheet,
  Text,
  TouchableOpacity, 
  View 
} from "react-native";
import MicrophoneIcon from "../../assets/icons/microphone.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { globalStyles } from "../../styles";
import { useTheme } from "../../hooks";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { BottomTabsParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { HeaderComponent, TranslationInputComponent } from "../../components";

type HomeNavigationProp = NativeStackNavigationProp<BottomTabsParamList, "Home">;
type HomeRouteProp = RouteProp<BottomTabsParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
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
      <View>
        <Text style={[styles.words, { color: text }]}>WORDS</Text>
        <TranslationInputComponent 
          additionalLanguage={additionalLanguage}
          onChangeLanguage={onChangeLanguage}
          currentLang={currentLang}
        />
      </View>
      <View>
        <TouchableOpacity onPress={onMyDictionary}>
          <Text style={[styles.myDictionary, { color: text }]}>{t("My dictionary")}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.microphoneButton, { backgroundColor: secondary }]}>
        <MicrophoneIcon width={25} height={25} />
      </TouchableOpacity>
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
  microphoneButton: {
    padding: 20,
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 40,
  },
  myDictionary: {
    fontSize: 26,
    fontWeight: "bold"
  }
});
