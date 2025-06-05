import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SettingsItemComponent } from "./SettingsItemComponent";
import { Icon } from "react-native-paper";

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

      <SettingsItemComponent
        Icon={() => <Icon size={35} source={"bell-ring-outline"} />}
        itemName={t("Reminder")}
        Component={<></>}
      />

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
