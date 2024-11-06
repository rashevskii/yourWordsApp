import { Alert } from "react-native";
import i18n from "../locales/i18n";

export interface IErrorParams {
  error: any;
}

export const errorHandler = ({ error }: IErrorParams) => {
  const t = i18n.t;
  Alert.alert(t("Error"), String(error))
}