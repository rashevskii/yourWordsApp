import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import { WelcomeSteps } from "../../components";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { AuthStackParamList } from "../../navigations";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RouteProp } from "@react-navigation/native";

type SelectLanguagesNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SelectLanguages'>;
type SelectLanguagesRouteProp = RouteProp<AuthStackParamList, 'SelectLanguages'>;

interface Props {
  navigation: SelectLanguagesNavigationProp;
  route: SelectLanguagesRouteProp;
}

export const SelectLanguages: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const onBack = () => {
    navigation.goBack();
  } 

  return (
    <View style={[ globalStyles.baseContainer, { backgroundColor: theme.colors.background }]}>
      <WelcomeSteps activeMarker={1} />
      <View style={styles.arrowTextContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft width={40} height={40} />
        </TouchableOpacity>
        <Text style={[styles.selectText]}>{t("Select languages")}</Text>
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
  }
});