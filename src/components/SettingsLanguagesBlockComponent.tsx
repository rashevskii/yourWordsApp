import { FC, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SettingsItemComponent } from "./SettingsItemComponent";
import { useTranslation } from "react-i18next";
import { useAppSettings, useTheme } from "../hooks";
import { SelectableComponent } from "./SelectableComponent";
import {
  listOfLanguages,
  ListOfLanguagesItemType,
  listOfUILanguages,
  ListOfUILanguagesItemType,
  mockLanguage,
  mockUILanguage
} from "../data";
import { SelectItem } from "../types";
import { PlanetIcon } from "../components";
import { changeAllWords } from "../services";
import { errorHandler } from "../helpers";
import { useDispatch } from "react-redux";
import { setMainLanguage } from "../store";
import { appEventEmitter, events } from "../events";

export interface SettingsLanguagesBlockProps {
  setLoading: (loading: boolean) => void;
}

export const SettingsLanguagesBlockComponent: FC<SettingsLanguagesBlockProps> = ({ setLoading }) => {
  const { colors: { border } } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    blockStyles,
  } = styles;
  const { nativeLanguage } = useAppSettings();
  const [studiedLanguage, setStudiedLanguage] = useState<ListOfLanguagesItemType>(mockLanguage);
  const [nativeLang, setNativeLang] = 
    useState<ListOfUILanguagesItemType | null>(listOfUILanguages.find((lang) => lang.key === nativeLanguage) || null);
  const [appLanguage, setAppLanguage] = useState<ListOfUILanguagesItemType>(mockUILanguage);
  const languages = useMemo(() => {
    return listOfLanguages.map((item) => {
      return {
        label: item.translatedName,
        value: item
      };
    });
  }, []);
  const nativeAndAppLangs = useMemo(() => {
    return listOfUILanguages.map((lang) => {
      return {
        label: lang.translatedName,
        value: lang
      }
    })
  }, []);

  useEffect(() => {
    const { mainLanguage, language } = useAppSettings();
    const currentStudiedLang = listOfLanguages.find((lang) => lang.key === mainLanguage);
    const currentAppLang = listOfUILanguages.find((lang) => lang.key === language);
    if (currentStudiedLang) {
      setStudiedLanguage(currentStudiedLang);
    }
    if (currentAppLang) {
      setAppLanguage(currentAppLang);
    }
  }, []);

  const onChangeStudiedLanguage = (item: SelectItem<ListOfLanguagesItemType>) => {
    if (item.value.key !== studiedLanguage.key) {
      setLoading(true);
      Alert.alert(
        t("Attention"),
        t("This action will may take a bit time"),
        [
          {
            text: t("Cancel"),
            onPress: () => setLoading(false),
            style: "cancel"
          },
          {
            text: t("Next"),
            onPress: async () => {
              try {
                setStudiedLanguage(item.value);
                await changeAllWords(item.value.key);
                dispatch(setMainLanguage(item.value.key));
                appEventEmitter.emit(events.MAIN_LANGUAGE_CHANGED);
              } catch(error: any) {
                errorHandler(error);
              } finally {
                setLoading(false);
              }
            }
          }
        ]
      );
    }
  }

  const onChangeNativeLanguage = (item: SelectItem<ListOfUILanguagesItemType>) => {
    setNativeLang(item.value);
  }

  const onChangeAppLanguage = (item: SelectItem<ListOfUILanguagesItemType>) => {
    setAppLanguage(item.value);
  }

  const renderStudiedLanguages = () => {
    return (
      <SelectableComponent<ListOfLanguagesItemType>
        items={languages}
        showShevron={true}
        onValueChange={onChangeStudiedLanguage}
        defaultValue={languages.find((item) => item.value === studiedLanguage)}
      />
    )
  }

  const renderNativeLanguages = () => {
    return (
      <SelectableComponent<ListOfUILanguagesItemType>
        items={nativeAndAppLangs}
        showShevron={true}
        onValueChange={onChangeNativeLanguage}
        defaultValue={nativeAndAppLangs.find((item) => item.value === nativeLang)}
      />
    );
  }

  const renderAppLanguages = () => {
    return (
      <SelectableComponent<ListOfUILanguagesItemType>
        items={nativeAndAppLangs}
        showShevron={true}
        onValueChange={onChangeAppLanguage}
        defaultValue={nativeAndAppLangs.find((item) => item.value === appLanguage)}
      />
    );
  }

  return (
    <View style={[blockStyles, { borderColor: border }]}>
      <SettingsItemComponent
        Icon={studiedLanguage.icon}
        itemName={t("Language being studied")}
        Component={renderStudiedLanguages}
      />

      <SettingsItemComponent
        Icon={nativeLang?.icon || PlanetIcon}
        itemName={t("Native language")}
        Component={renderNativeLanguages}
      />
      
      <SettingsItemComponent
        Icon={appLanguage.icon}
        itemName={t("Application language")}
        Component={renderAppLanguages}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  blockStyles: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
});