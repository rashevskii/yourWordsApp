import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";
import { 
  FinlandIcon, 
  MainButton, 
  NorwayIcon, 
  RussiaIcon, 
  SwedenIcon, 
  UkIcon, 
  UkraineIcon 
} from "../../components";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AuthStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../store";

type StartNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Start'>;
type StartRouteProp = RouteProp<AuthStackParamList, 'Start'>;

interface StartProps {
  navigation: StartNavigationProp;
  route: StartRouteProp;
}

export const StartScreen: FC<StartProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const onBack = () => {
    navigation.goBack();
  } 

  const onPressStart = () => {
    dispatch(setAuthentication(true));
  }

  return (
    <View style={[ globalStyles.baseContainer, { backgroundColor: colors.background }]}>
      <View style={styles.arrowTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft width={40} height={40} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.iconsContainer}>
          <View><FinlandIcon iconWidth={45} iconHeight={45} /></View>
          <View style={styles.row}>
            <SwedenIcon style={styles.icon} iconWidth={45} iconHeight={45} />
            <UkraineIcon style={styles.icon} iconWidth={45} iconHeight={45} />
          </View>
          <View style={styles.row}>
            <NorwayIcon style={styles.icon} iconWidth={45} iconHeight={45} />
            <UkIcon style={styles.icon} iconWidth={45} iconHeight={45} />
            <RussiaIcon style={styles.icon} iconWidth={45} iconHeight={45} />
          </View>
        </View>
        <Text style={[styles.textStart, { color: colors.text }]}>{t("Time to start")}</Text>
        <Text style={[styles.text, { color: colors.text }]}>{t("Learn your first words right now")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton text={t("Start")} onPress={onPressStart} />
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
  buttonContainer: {
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 50,
    left: 0,
    width: "100%"
  },
  textStart: {
    textAlign: "center", 
    fontSize: 26, 
    fontWeight: "bold", 
    marginTop: 30, 
    marginBottom: 10
  },
  text: {
    textAlign: "center", 
    fontSize: 16, 
    fontWeight: "bold",
    paddingHorizontal: 15
  },
  iconsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100
  },
  icon: {
    marginHorizontal: 15,
    marginVertical: 5
  },
  row: {
    flexDirection: "row"
  }
});