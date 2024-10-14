import React, { FC, useState } from "react";
import { 
  StyleSheet,
  Text,
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import PlanetIcon from "../../assets/icons/planet.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import SearchIcon from "../../assets/icons/search.svg";
import MicrophoneIcon from "../../assets/icons/microphone.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { globalStyles } from "../../styles";
import { useTheme } from "../../hooks";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { BottomTabsParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";

type HomeNavigationProp = NativeStackNavigationProp<BottomTabsParamList, "Home">;
type HomeRouteProp = RouteProp<BottomTabsParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors: { background, border, text, secondary } } = useTheme();
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
    navigation.navigate("Trainings");
  }

  return (
    <View style={[
      baseContainer, 
      containerPadding, 
      { backgroundColor: background }
    ]}>
      <View style={styles.header}>
        <TouchableOpacity>
          <PlanetIcon width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SettingsIcon width={35} height={35} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.words, { color: text }]}>WORDS</Text>
        <View style={[styles.inputContainer, { borderColor: border }]}>
        <TouchableOpacity 
            style={[
              styles.langButton, 
              { 
                backgroundColor: secondary, 
                opacity: additionalLanguage && additionalLanguage.length ? 1 : 0.5
              }
            ]} 
            onPress={onChangeLanguage}
            disabled={additionalLanguage && additionalLanguage.length ? false : true}
          >
            <Text style={[styles.langName, { color: text }]}>{currentLang}</Text>
          </TouchableOpacity>
          <TextInput 
            placeholder={t("Enter word for translation")} 
            multiline={true}
            style={styles.input}
          />
          <TouchableOpacity style={styles.searchButton}>
            <SearchIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
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

}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  words: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 8,
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    padding: 5,
    marginVertical: 20,
  },
  langButton: {
    height: 50,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  langName: {
    textTransform: "uppercase",
    fontSize: 20
  },
  searchButton: {
    marginLeft: "auto",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  microphoneButton: {
    padding: 20,
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 40,
  },
  input: {
    width: 210, 
    fontSize: 18, 
    paddingLeft: 0,
    marginLeft: 10,
    paddingVertical: 0
  },
  myDictionary: {
    fontSize: 26,
    fontWeight: "bold"
  }
});
