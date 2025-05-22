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
  SelectItem,
} from "../types";
import { 
  changeAllAdditionalWords, 
  changeAllMainWords, 
  changeAllNativeWords 
} from "../services";
import { errorHandler } from "../helpers";
import { useDispatch } from "react-redux";
import { 
  setAdditionaLanguage, 
  setLanguage, 
  setMainLanguage, 
  setNativeLanguge 
} from "../store";
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

  const changeMainLanguage = async (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    await changeAllMainWords(selectedItem.value.key);
    setStudiedLanguage(selectedItem.value);
    dispatch(setMainLanguage(selectedItem.value.key));
    appEventEmitter.emit(events.MAIN_LANGUAGE_CHANGED);
  }

  const changeAdditionalLanguage = async (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    await changeAllAdditionalWords(selectedItem.value.key);
    setAdditionalLang(selectedItem.value);
    dispatch(setAdditionaLanguage(selectedItem.value.key));
    appEventEmitter.emit(events.ADDITIONAL_LANGUAGE_CHANGED);
  }

  const changeNativeLanguage = async (selectedItem: SelectItem<ListOfUILanguagesItemType>) => {
    await changeAllNativeWords(selectedItem.value.key);
    setNativeLang(selectedItem.value);
    dispatch(setNativeLanguge(selectedItem.value.key));
    appEventEmitter.emit(events.NATIVE_LANGUAGE_CHANGED);
  }

  const approveTranslate = (
    selectedItem: SelectItem<ListOfLanguagesItemType | ListOfUILanguagesItemType>, 
    languageType: "studied" | "additional" | "native"
  ) => {
    Alert.alert(
      t("Attention"),
      t("This action will may take a bit time"),
      [
        {
          text: t("Cancel"),
          onPress: () => {},
          style: "cancel"
        },
        {
          text: t("Next"),
          onPress: async () => {
            setLoading(true);
            try {
              switch (languageType) {
                case "studied":
                  await changeMainLanguage(selectedItem as SelectItem<ListOfLanguagesItemType>);
                  return;
                case "additional":
                  await changeAdditionalLanguage(selectedItem as SelectItem<ListOfLanguagesItemType>);
                  return;
                case "native":
                  await changeNativeLanguage(selectedItem as SelectItem<ListOfUILanguagesItemType>);
                  return;
              }
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

  const onChangeLanguage = (
    selectedItem: SelectItem<ListOfLanguagesItemType | ListOfUILanguagesItemType>, 
    languageType: "studied" | "additional" | "native"
  ) => {
    Alert.alert(
      t("Attention"),
      t("This action will translate all words"),
      [
        {
          text: t("Cancel"),
          onPress: () => {},
          style: "cancel"
        },
        {
          text: t("Next"),
          onPress: () => approveTranslate(selectedItem, languageType),
        }
      ]
    );
  }

  const onChangeStudiedLanguage = (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    if (selectedItem.value.key !== studiedLanguage.key) {
      onChangeLanguage(selectedItem, "studied");
    }
  }

  const onChangeAdditionalLanguage = (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    if (selectedItem.value.key !== additionalLang.key) {
      onChangeLanguage(selectedItem, "additional");
    }
  }

  const onChangeNativeLanguage = (selectedItem: SelectItem<ListOfUILanguagesItemType>) => {
    if (selectedItem.value.key !== nativeLang.key) {
      onChangeLanguage(selectedItem, "native");
    }
  }

  const onChangeAppLanguage = (selectedItem: SelectItem<ListOfUILanguagesItemType>) => {
    if (selectedItem.value.key !== appLanguage.key) {
      setAppLanguage(selectedItem.value);
      dispatch(setLanguage(selectedItem.value.key));
    }
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