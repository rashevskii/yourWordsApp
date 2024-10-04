import { useSelector } from "react-redux";
import { RootState } from "../store";
import { darkTheme, lightTheme } from "../styles";

export const useTheme = () => {
  const currentTheme = useSelector((state: RootState) => state.appSettings.theme);
  const theme = currentTheme === "light" ? lightTheme : darkTheme;
  return theme;
}