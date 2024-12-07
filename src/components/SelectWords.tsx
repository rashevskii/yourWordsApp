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
import { Translation } from "../screens";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";
import { WordButton } from "./WordButton";
import { BottomSheetActionButtons } from "./BottomSheetActionButtons";

export interface ISelectWordsProps {
  translation: Translation[];
  clearTranslate: () => void;
  saveTranslation: () => Promise<void>;
}

export const SelectWords: FC<ISelectWordsProps> = (
  { 
    translation,
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

  useEffect(() => {
    if (translation.length) {
      handleSheetOpen();
    }
  }, [translation]);

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetClose = useCallback(() => {
    clearTranslate();
    bottomSheetRef.current?.close();
  }, []);

  // функция нужна будет, если будут альтернативные варианты перевода (требует доработки, скорее всего)
  // const onSelectTranslate = (index: number, word: string) => {
  //   if (translation.length === 1) {
  //     setNativeTranslate(word);
  //   } else {
  //     if (index === 1) {
  //       setNativeTranslate(word);
  //     } else {
  //       setMainOrAdditionalTranslate(word);
  //     }
  //   }
  // }

  const renderVariants = () => {
    return translation.map((translation, index) => {
      return (
        <View key={index} style={styles.variantContainer}>
          <Text style={[styles.lang, { color: text }]}>{translation.lang}:</Text>
          <View style={[styles.variant, { borderBottomColor: border }]}>
            {translation.translations.map((text) => {
              return (
                <WordButton 
                  key={text}
                  index={index}
                  word={text}
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
          positiveAction={saveTranslation}
          negativeAction={handleSheetClose}
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