import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { 
  FC, 
  useCallback, 
  useEffect, 
  useMemo,
  useRef 
} from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity 
} from "react-native";

export interface IBottomSheetProps {
  translatedText: string;
}

export const BottomSheetComponent: FC<IBottomSheetProps> = ({ translatedText }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

  useEffect(() => {
    handleSheetOpen();
  }, [translatedText]);

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>{translatedText}</Text>
        <TouchableOpacity onPress={handleSheetClose}>
          <Text>Закрыть</Text>
        </TouchableOpacity>
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
});