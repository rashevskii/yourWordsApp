import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export interface SettingsAppBlockProps {

}

export const SettingsAppBlockComponent: FC<SettingsAppBlockProps> = () => {
  const { colors: { border } } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    blockStyles,
  } = styles;
	return (
    <View style={[blockStyles, { borderColor: border }]}>

    </View>
  );
};

const styles = StyleSheet.create({
  blockStyles: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
});
