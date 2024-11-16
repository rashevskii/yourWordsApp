import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { 
  FC, 
  useCallback, 
  useEffect, 
  useMemo,
  useRef, 
  useState
} from "react";
import { 
  StyleSheet, 
  Text,
  View
} from "react-native";
import { Translations } from "../screens";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";
import { WordButton } from "./WordButton";
import { BottomSheetActionButtons } from "./BottomSheetActionButtons";

export interface ISelectWordsProps {
  translations: Translations[];
  sourceWord: string;
  changedLanguages: boolean;
  clearTranslate: () => void;
  saveTranslation: (
    originalWord: string,
    nativeTranslation: string,
    additionalTranslation: string | null,
    groupId: string | null,
    addedDate: string
  ) => void;
}

export const SelectWords: FC<ISelectWordsProps> = (
  { 
    translations, 
    sourceWord, 
    changedLanguages,
    clearTranslate,
    saveTranslation
  }
) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
  const { t } = useTranslation();
  const { colors: 
    { 
      border, 
      text,
    } 
  } = useTheme();
  const [
    mainOrAdditionalTranslate, 
    setMainOrAdditionalTranslate
  ] = useState(translations.length ? translations[0].translatedText : null);
  const [
    nativeTranslate, 
    setNativeTranslate
  ] = useState(translations.length ? translations[1]?.translatedText || null : null);

  useEffect(() => {
    handleSheetOpen();
  }, [translations]);

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetClose = useCallback(() => {
    clearTranslate();
    setMainOrAdditionalTranslate(null);
    setNativeTranslate(null);
    bottomSheetRef.current?.close();
  }, []);

  const onSelectTranslate = (index: number, word: string) => {
    if (translations.length === 1) {
      setNativeTranslate(word);
    } else {
      if (index === 1) {
        setNativeTranslate(word);
      } else {
        setMainOrAdditionalTranslate(word);
      }
    }
  }

  const onSaveWords = () => {
    if (changedLanguages) {
      handleSheetClose();
      saveTranslation(
        mainOrAdditionalTranslate || "",
        nativeTranslate || "",
        sourceWord,
        null,
        Date.now.toString()
      );
    } else {
      handleSheetClose();
      saveTranslation(
        sourceWord,
        nativeTranslate || "",
        mainOrAdditionalTranslate || "",
        null,
        Date.now.toString()
      );
    }
  }

  const renderVariants = () => {
    return translations?.map((translation, index) => {
      return (
        <View key={translation.translatedText} style={styles.variantContainer}>
          <Text style={[styles.lang, { color: text }]}>{translation.lang}:</Text>
          <View style={[styles.variant, { borderBottomColor: border }]}>
            <WordButton 
              selectTranslate={onSelectTranslate}
              selectedWord={index === 1 ? nativeTranslate || "" : mainOrAdditionalTranslate || ""}
              index={index}
              word={translation.translatedText}
            />
            {translation.alternatives.map((alternative) => {
              return (
                <WordButton 
                  key={alternative}
                  selectedWord={index === 1 ? nativeTranslate || "" : mainOrAdditionalTranslate || ""}
                  selectTranslate={onSelectTranslate}
                  index={index}
                  word={alternative}
                />
              )
            })}
          </View>
        </View>
      )
    })
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
    >
      <BottomSheetView style={styles.contentContainer}>
        {renderVariants()}
        <BottomSheetActionButtons 
          positiveActionText={t("Save")}
          negativeActionText={t("Do not save")}
          positiveAction={onSaveWords}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  variantContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  variant: {
    borderBottomWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%"
  },
  lang: {
    fontSize: 20,
    fontWeight: "light"
  },
});