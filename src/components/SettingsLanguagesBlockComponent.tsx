import { FC, useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SettingsItemComponent } from "./SettingsItemComponent";
import { useTranslation } from "react-i18next";
import { useAppSettings, useTheme } from "../hooks";
import { SelectableComponent } from "./SelectableComponent";
import {
  listOfLanguages,
  listOfUILanguages,
  mockLanguage,
  mockUILanguage
} from "../data";
import { 
  ListOfLanguagesItemType, 
  ListOfUILanguagesItemType, 
  SelectItem 
} from "../types";
import { changeAllAdditionalWords, changeAllMainWords } from "../services";
import { errorHandler } from "../helpers";
import { useDispatch } from "react-redux";
import { setAdditionaLanguage, setMainLanguage } from "../store";
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
  const { 
    nativeLanguage, 
    mainLanguage, 
    additionalLanguage, 
    language 
  } = useAppSettings();
  const [
    studiedLanguage, 
    setStudiedLanguage
  ] = useState(listOfLanguages.find((lang) => lang.key === mainLanguage) || mockLanguage);
  const [
    additionalLang, 
    setAdditionalLang
  ] = useState(listOfLanguages.find((lang) => lang.key === additionalLanguage) || mockLanguage);
  const [
    nativeLang, 
    setNativeLang
  ] = useState(listOfUILanguages.find((lang) => lang.key === nativeLanguage) || mockUILanguage);
  const [
    appLanguage, 
    setAppLanguage
  ] = useState(listOfUILanguages.find((lang) => lang.key === language) || mockUILanguage);
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

  const onChangeStudiedLanguage = (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    if (selectedItem.value.key !== studiedLanguage.key) {
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
                await changeAllMainWords(selectedItem.value.key);
                setStudiedLanguage(selectedItem.value);
                dispatch(setMainLanguage(selectedItem.value.key));
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

  const onChangeAdditionalLanguage = (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    if (selectedItem.value.key !== additionalLang.key) {
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
                await changeAllAdditionalWords(selectedItem.value.key);
                setAdditionalLang(selectedItem.value);
                dispatch(setAdditionaLanguage(selectedItem.value.key));
                appEventEmitter.emit(events.ADDITIONAL_LANGUAGE_CHANGED);
              } catch(error: any) {
                console.log("error: ", error);
                
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
        defaultValue={languages.find((item) => item.value.key === studiedLanguage.key)}
      />
    )
  }

  const renderAdditionalLanguages = () => {
    return (
      <SelectableComponent<ListOfLanguagesItemType>
        items={languages}
        showShevron={true}
        onValueChange={onChangeAdditionalLanguage}
        defaultValue={
          languages.find((item) => item.value.key === additionalLang.key) || 
          {label: additionalLang.translatedName, value: additionalLang}
        }
      />
    )
  }

  const renderNativeLanguages = () => {
    return (
      <SelectableComponent<ListOfUILanguagesItemType>
        items={nativeAndAppLangs}
        showShevron={true}
        onValueChange={onChangeNativeLanguage}
        defaultValue={nativeAndAppLangs.find((item) => item.value.key === nativeLang.key)}
      />
    );
  }

  const renderAppLanguages = () => {
    return (
      <SelectableComponent<ListOfUILanguagesItemType>
        items={nativeAndAppLangs}
        showShevron={true}
        onValueChange={onChangeAppLanguage}
        defaultValue={nativeAndAppLangs.find((item) => item.value.key === appLanguage.key)}
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
        Icon={additionalLang.icon}
        itemName={t("Additional language")}
        Component={renderAdditionalLanguages}
      />

      <SettingsItemComponent
        Icon={nativeLang.icon}
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