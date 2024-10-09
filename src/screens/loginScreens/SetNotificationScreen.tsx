import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";
import { MainButton, WelcomeSteps } from "../../components";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AuthStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import RingingBell from "../../assets/icons/bell-ring.svg";
import { useDispatch } from "react-redux";
import { setReminder } from "../../store";

type SetNotificationNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SetNotification'>;
type SetNotificationRouteProp = RouteProp<AuthStackParamList, 'SetNotification'>;

interface SetNotificationProps {
  navigation: SetNotificationNavigationProp;
  route: SetNotificationRouteProp;
}

export const SetNotificationScreen: FC<SetNotificationProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const onBack = () => {
    navigation.goBack();
  } 

  const onPressYes = () => {
    dispatch(setReminder(true));
    navigation.navigate("RatePlan");
  }

  const onPressNo = () => {
    dispatch(setReminder(false));
    navigation.navigate("RatePlan");
  }

  return (
    <View style={[ globalStyles.baseContainer, { backgroundColor: colors.background }]}>
      <WelcomeSteps activeMarker={4} />
      <View style={styles.arrowTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft width={40} height={40} />
        </TouchableOpacity>
      </View>
      <View>
        <RingingBell width={250} height={250} style={styles.icon} />
        <Text style={[styles.textReminder, { color: colors.text }]}>{t("Reminder")}</Text>
        <Text style={[styles.text, { color: colors.text }]}>{t("Do you want to receive reminders")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton text={t("Yes")} onPress={onPressYes} />
        <TouchableOpacity style={styles.btnNo} onPress={onPressNo}>
          <Text style={[styles.btnText, { color: colors.text }]}>{t("No thanks")}</Text>
        </TouchableOpacity>
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
  textReminder: {
    textAlign: "center", 
    fontSize: 26, 
    fontWeight: "bold", 
    marginTop: 30, 
    marginBottom: 30
  },
  text: {
    textAlign: "center", 
    fontSize: 16, 
    fontWeight: "bold"
  },
  btnText: {
    textAlign: "center", 
    fontSize: 24, 
    fontWeight: "bold"
  },
  btnNo: {
    paddingVertical: 15
  },
  icon: {
    alignSelf: "center", 
    marginTop: 50
  }
});