import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TrainingProgressComponent } from "./TrainingProgressComponent";
import { WordsCountComponent } from "./WordsCountComponent";
import { useTheme } from "../hooks";
import { TrashComponent } from "./TrashComponent";

export interface IFolderComponentProps {
  idFolder: string | null;
  percentage: number;
  name: string;
  imagePath: string | null;
  countOfWords: number;
  onDeleteFolder: (id: string | null) => void;
  onFolder: (idFolder: string | null, folderName: string) => void;
}

export const FolderComponent: FC<IFolderComponentProps> = (
  { 
    idFolder,
    percentage, 
    name, 
    countOfWords, 
    imagePath,
    onDeleteFolder,
    onFolder
  }
) => {
  const { colors: { background, border, text } } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: background, borderColor: border }]}
      onPress={() => onFolder(idFolder, name)}
    >
      <Text numberOfLines={2} allowFontScaling={true} style={[styles.name, { color: text }]}>{name}</Text>
      {
        imagePath ? 
        <Image 
          width={50} 
          height={50} 
          resizeMode={"contain"} 
          source={{ uri: `file://${imagePath}` }} 
        /> : null
      }
      <View style={styles.dataContainer}>
        <TrainingProgressComponent percentage={percentage} />
        {
          idFolder ? (
            <TouchableOpacity onPress={() => onDeleteFolder(idFolder)}>
              <TrashComponent />
            </TouchableOpacity>
          ): null
        }
        <WordsCountComponent countOfWords={countOfWords} />
      </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    margin: 10,
    zIndex: 10
  },
  name: {
    textAlign: "center",
    fontSize: 16,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto"
  }
});