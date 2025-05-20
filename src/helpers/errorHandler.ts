import { Alert } from "react-native";
import i18n from "../locales/i18n";

export interface IErrorParams {
  error: any;
}

export const errorHandler = ({ error }: IErrorParams) => {
  const t = i18n.t;
  if (error) {
    Alert.alert(t("Error"), `${error}`);
  } else {
    Alert.alert(t("Error"), t("Unknown error"));
  }
}