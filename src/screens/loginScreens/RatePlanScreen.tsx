import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AuthStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks";
import { useDispatch } from "react-redux";
import { MainButton, WelcomeSteps } from "../../components";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { globalStyles } from "../../styles";

type RatePlanNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'RatePlan'>;
type RatePlanRouteProp = RouteProp<AuthStackParamList, 'RatePlan'>;

interface RatePlanProps {
  navigation: RatePlanNavigationProp;
  route: RatePlanRouteProp;
}

export const RatePlanScreen: FC<RatePlanProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const onBack = () => {
    navigation.goBack();
  } 

  const onNext = () => {
    // navigation.navigate("MainLanguage");
  }

  return (
    <View style={[globalStyles.baseContainer, { backgroundColor: colors.background }]}>
      <WelcomeSteps activeMarker={5} />
      <View style={styles.arrowTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft width={40} height={40} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={[styles.rateContainer, { borderColor: colors.border }]}>
          <Text>Your Words Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.rateContainer, { borderColor: colors.border }]}>
          <Text>{t("Free version")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton text={t("Next")} onPress={onNext} />
      </View>
    </View>
  )
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
  rateContainer: {
    borderWidth: 2,
    borderRadius: 30,
    height: 200,
    marginBottom: 15,
    marginHorizontal: 15,
    padding: 15
  }
});