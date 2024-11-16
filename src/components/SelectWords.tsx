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
  TouchableOpacity, 
  View
} from "react-native";
import { Translations } from "../screens";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";
import { WordButton } from "./WordButton";

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
      primary, 
      button, 
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
    console.log("sourceWord", sourceWord);
    console.log("nativeOrAdditionalTranslate", mainOrAdditionalTranslate);
    console.log("nativeTranslate", nativeTranslate);
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
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.button, { borderColor: primary }]} onPress={handleSheetClose}>
            <Text style={{ color: text }}>{t("Do not save")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { borderColor: primary, backgroundColor: button }]} onPress={onSaveWords}>
            <Text style={{ color: text }}>{t("Save")}</Text>
          </TouchableOpacity>
        </View>
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
  button: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    margin: 5
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15
  },
  lang: {
    fontSize: 20,
    fontWeight: "light"
  },
});