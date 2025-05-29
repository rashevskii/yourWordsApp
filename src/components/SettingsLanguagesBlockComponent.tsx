import { FC, useCallback, useMemo, useState } from "react";
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
  ] = useState(
    listOfLanguages.find((lang) => lang.key === mainLanguage) || mockLanguage
  );

  const [
    additionalLang, 
    setAdditionalLang
  ] = useState(
    listOfLanguages.find((lang) => lang.key === additionalLanguage) || mockLanguage
  );

  const [
    nativeLang, 
    setNativeLang
  ] = useState(
    listOfUILanguages.find((lang) => lang.key === nativeLanguage) || mockUILanguage
  );

  const [
    appLanguage, 
    setAppLanguage
  ] = useState(
    listOfUILanguages.find((lang) => lang.key === language) || mockUILanguage
  );

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

  const changeMainLanguage = useCallback(async (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    await changeAllMainWords(selectedItem.value.key);
    setStudiedLanguage(selectedItem.value);
    dispatch(setMainLanguage(selectedItem.value.key));
    appEventEmitter.emit(events.MAIN_LANGUAGE_CHANGED);
  }, [dispatch]);

  const changeAdditionalLanguage = useCallback(async (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    await changeAllAdditionalWords(selectedItem.value.key);
    setAdditionalLang(selectedItem.value);
    dispatch(setAdditionaLanguage(selectedItem.value.key));
    appEventEmitter.emit(events.ADDITIONAL_LANGUAGE_CHANGED);
  }, [dispatch]);

  const changeNativeLanguage = useCallback(async (selectedItem: SelectItem<ListOfUILanguagesItemType>) => {
    await changeAllNativeWords(selectedItem.value.key);
    setNativeLang(selectedItem.value);
    dispatch(setNativeLanguge(selectedItem.value.key));
    appEventEmitter.emit(events.NATIVE_LANGUAGE_CHANGED);
  }, [dispatch]);

  const approveTranslate = useCallback(async (
    selectedItem: SelectItem<ListOfLanguagesItemType | ListOfUILanguagesItemType>, 
    languageType: "studied" | "additional" | "native"
  ) => {
    const success = await new Promise((resolve) => {
      Alert.alert(
        t("Attention"),
        t("This action will may take a bit time"),
        [
          {
            text: t("Cancel"),
            onPress: () => resolve(false),
            style: "cancel"
          },
          {
            text: t("Next"),
            onPress: () => resolve(true),
          }
        ]
      );
    });
    if (success) {
      setLoading(true);
      try {
        switch (languageType) {
          case "studied":
            await changeMainLanguage(selectedItem as SelectItem<ListOfLanguagesItemType>);
            return true;
          case "additional":
            await changeAdditionalLanguage(selectedItem as SelectItem<ListOfLanguagesItemType>);
            return true;
          case "native":
            await changeNativeLanguage(selectedItem as SelectItem<ListOfUILanguagesItemType>);
            return true;
        }
      } catch(error: any) {
        errorHandler(error);
        return false;
      } finally {
        setLoading(false);
      }
    } else {
      return false;
    }
  }, [
    t, 
    setLoading, 
    changeMainLanguage, 
    changeAdditionalLanguage, 
    changeNativeLanguage
  ]);

  const onChangeLanguage = useCallback(async (
    selectedItem: SelectItem<ListOfLanguagesItemType | ListOfUILanguagesItemType>, 
    languageType: "studied" | "additional" | "native"
  ) => {
    const success = await new Promise((resolve) => {
      Alert.alert(
        t("Attention"),
        t("This action will translate all words"),
        [
          {
            text: t("Cancel"),
            onPress: () => resolve(false),
            style: "cancel"
          },
          {
            text: t("Next"),
            onPress: () => resolve(true),
          }
        ]
      );
    });
    if (success) {
      return await approveTranslate(selectedItem, languageType);
    } else {
      return false;
    }
  }, [t, approveTranslate]);

  const onChangeStudiedLanguage = useCallback(async (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    if (selectedItem.value.key !== studiedLanguage.key) {
      return await onChangeLanguage(selectedItem, "studied");
    }
    return false;
  }, [studiedLanguage, onChangeLanguage]);

  const onChangeAdditionalLanguage = useCallback(async (selectedItem: SelectItem<ListOfLanguagesItemType>) => {
    if (selectedItem.value.key !== additionalLang.key) {
      return await onChangeLanguage(selectedItem, "additional");
    }
    return false;
  }, [additionalLang, onChangeLanguage]);

  const onChangeNativeLanguage = useCallback(async (selectedItem: SelectItem<ListOfUILanguagesItemType>) => {
    if (selectedItem.value.key !== nativeLang.key) {
      return await onChangeLanguage(selectedItem, "native");
    }
    return false;
  }, [nativeLang, onChangeLanguage]);

  const onChangeAppLanguage = useCallback((selectedItem: SelectItem<ListOfUILanguagesItemType>) => {
    if (selectedItem.value.key !== appLanguage.key) {
      setAppLanguage(selectedItem.value);
      dispatch(setLanguage(selectedItem.value.key));
    }
  }, [appLanguage, dispatch, setAppLanguage]);

  const renderStudiedLanguages = useMemo(() => {
    return (
      <SelectableComponent<ListOfLanguagesItemType>
        items={
          languages
            .filter((lang) => lang.value.key !== additionalLang.key && lang.value.key !== nativeLang.key)
        }
        showShevron={true}
        onValueChange={onChangeStudiedLanguage}
        defaultValue={languages.find((item) => item.value.key === studiedLanguage.key)}
      />
    )
  }, [
    languages, 
    onChangeStudiedLanguage, 
    studiedLanguage,
    additionalLang,
    nativeLang
  ]);

  const renderAdditionalLanguages = useMemo(() => {
    return (
      <SelectableComponent<ListOfLanguagesItemType>
        items={
          languages
            .filter((lang) => lang.value.key !== studiedLanguage.key && lang.value.key !== nativeLang.key)
        }
        showShevron={true}
        onValueChange={onChangeAdditionalLanguage}
        defaultValue={
          languages.find((item) => item.value.key === additionalLang.key) || 
          {label: additionalLang.translatedName, value: additionalLang}
        }
      />
    )
  }, [
    languages, 
    onChangeAdditionalLanguage, 
    studiedLanguage, 
    additionalLang,
    nativeLang
  ]);

  const renderNativeLanguages = useMemo(() => {
    return (
      <SelectableComponent<ListOfUILanguagesItemType>
        items={
          nativeAndAppLangs
            .filter((lang) => lang.value.key !== studiedLanguage.key && lang.value.key !== additionalLang.key )
        }
        showShevron={true}
        onValueChange={onChangeNativeLanguage}
        defaultValue={nativeAndAppLangs.find((item) => item.value.key === nativeLang.key)}
      />
    );
  }, [
    nativeAndAppLangs, 
    onChangeNativeLanguage,
    studiedLanguage,
    additionalLang, 
    nativeLang
  ]);

  const renderAppLanguages = useMemo(() => {
    return (
      <SelectableComponent<ListOfUILanguagesItemType>
        items={nativeAndAppLangs}
        showShevron={true}
        onValueChange={onChangeAppLanguage}
        defaultValue={nativeAndAppLangs.find((item) => item.value.key === appLanguage.key)}
      />
    );
  }, [nativeAndAppLangs, onChangeAppLanguage, appLanguage]);

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
    paddingVertical: 15,
    marginBottom: 10,
  },
});