import React, { FC, useEffect, useMemo, useState } from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { MainStackParamList } from "../../navigations";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useAppSettings, useTheme } from "../../hooks";
import { globalStyles } from "../../styles";
import { useTranslation } from "react-i18next";
import { SelectableComponent, SettingsItemComponent, UkIcon } from "../../components";
import { RussiaIcon } from "../../components";
import { listOfLanguages, ListOfLanguagesItemType, UILanguagesType } from "../../data";
import { SelectItem } from "../../types";

type SettingsNavigationProp = NativeStackNavigationProp<MainStackParamList, "Settings">;
type SettingsRouteProp = RouteProp<MainStackParamList, "Settings">;

interface SettingsScreenProps {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
}

export const SettingsScreen: FC<SettingsScreenProps> = () => {
  const { colors: { background, border } } = useTheme();
  const { t } = useTranslation();
  const { baseContainer, containerPadding } = globalStyles;
  const {
    blockStyles,
  } = styles;
  const [studiedLanguage, setStudiedLanguage] = useState<ListOfLanguagesItemType>({} as ListOfLanguagesItemType);
  const [nativeLanguage, setNativeLanguage] = useState<UILanguagesType | null>(useAppSettings().nativeLanguage);
  const [appLanguage, setAppLanguage] = useState<UILanguagesType | null>(useAppSettings().language);
  const languages = useMemo(() => {
    return listOfLanguages.map((item) => {
      return {
        label: item.translatedName,
        value: item
      };
    });
  }, []);

  useEffect(() => {
    const { mainLanguage } = useAppSettings();
    if (mainLanguage) {
      const current = listOfLanguages.find((lang) => lang.key === mainLanguage);
      if (current) {
        setStudiedLanguage(current);
      }
    }
  }, []);

  const renderSelectButton = (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    return (
      <View style={{ padding: 10, borderRadius: 10 }}>
        <Text>{selectedItem ? selectedItem.label : t("Error empty value")}</Text>
      </View>
    );
  };

  const renderSelectItem = (item: SelectItem<ListOfLanguagesItemType>) => {
    return (
      <View style={{ padding: 10, borderRadius: 10 }}>
        <Text>{item ? item.label : t("Error empty value")}</Text>
      </View>
    );
  };

  return (
    <View style={[
          baseContainer, 
          containerPadding, 
          { backgroundColor: background }
        ]}>
      <View style={[blockStyles, { borderColor: border }]}>

        <SettingsItemComponent
          Icon={UkIcon}
          itemName={t("Language being studied")}
          Component={
            () => <SelectableComponent<ListOfLanguagesItemType>
                    items={languages}
                    renderButton={renderSelectButton}
                    renderItem={renderSelectItem}
                    onValueChange={(item) => {
                      setStudiedLanguage(item.value);
                    }}
                    defaultValue={languages.find((item) => item.value === studiedLanguage)}
                  />
          }
        />

        <SettingsItemComponent
          Icon={RussiaIcon}
          itemName={t("Native language")}
          Component={() => <Text>Русский</Text>}
        />
        
        <SettingsItemComponent
          Icon={RussiaIcon}
          itemName={t("Application language")}
          Component={() => <Text>Русский</Text>}
        />

      </View>

      <View style={[blockStyles, { borderColor: border }]}></View>

      <View style={[blockStyles, { borderColor: border }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  blockStyles: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
});