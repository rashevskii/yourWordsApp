import React, { FC, useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { 
  AddFolderSheet,
  AddFolderButton, 
  FoldersListComponent,
} from "../../components";
import { useTheme, useToast } from "../../hooks";
import { globalStyles } from "../../styles";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { BottomTabsParamList, WordsScreenProps } from "../../navigations";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { FoldersType, FolderType } from "../../types";
import { 
  addGroup,
  deleteGroup, 
  getAllGroups, 
  getAllWordCount, 
  getWordCountByGroupId 
} from "../../database";
import { errorHandler } from "../../helpers";
import { dbEventEmitter, events } from "../../events";
import { useTranslation } from "react-i18next";

export type DictionaryNavigationProp = NativeStackNavigationProp<BottomTabsParamList, 'Dictionary'>;
export type MainLanguageRouteProp = RouteProp<BottomTabsParamList, 'Dictionary'>;

export interface IDictionaryProps {
  navigation: DictionaryNavigationProp;
  route: MainLanguageRouteProp;
}

export const DictionaryScreen: FC<IDictionaryProps> = () => {
  const { colors: { background } } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<WordsScreenProps['navigation']>();
  const { baseContainer, containerPadding } = globalStyles;
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState<FoldersType>([]);
  const [openedSheet, setOpenedSheet] = useState(false);
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    fetchFolders();
    dbEventEmitter.addListener(events.WORD_ADDED, fetchFolders);
    dbEventEmitter.addListener(events.WORD_DELETED, fetchFolders);
    dbEventEmitter.addListener(events.FOLDER_ADDED, fetchFolders);
    return () => dbEventEmitter.removeAllListeners();
  }, []);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const folders = await getAllGroups();
      const folderData = await Promise.all(folders.map(async (folder) => {
        const count = await getWordCountByGroupId(folder.id!);
        return {
          ...folder,
          count
        } as FolderType
      }));
      const countOfAllWords = await getAllWordCount();
      const allFolders = [
        ({ 
          id: null, 
          group_name: t("All words"), 
          image_path: null, 
          count: countOfAllWords 
        } as FolderType), 
        ...folderData
      ];
      setFolders(allFolders);
    } catch(error: any) {
      errorHandler({error});
    } finally {
      setLoading(false);
    }
  }

  const onDeleteFolder = (id: number) => {
    Alert.alert(
      t("Attention"),
      t("Are you sure you want to delete this folder"),
      [
        {
          text: t("Cancel"),
          onPress: () => {}
        },
        {
          text: t("Yes delete"),
          onPress: () => handleDeleteFolder(id)
        }
      ]
    )
  };

  const handleOnPressFolder = (idFolder: number | null, folderName: string) => {
    navigation.navigate("Words", {
      idFolder,
      folderName
    })
  }

  const onPressAddFolder = useCallback(() => {
    setOpenedSheet(true);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setOpenedSheet(false);
    setFolderName("");
  }, []);

  const handleSaveFolder = async (folderName: string) => {
    const folderAlreadyExists = 
        folders.some((folder) => folder.group_name.toLowerCase() === folderName.toLowerCase());
    if (!folderAlreadyExists) {
      try {
        await addGroup(folderName)
          .then(() => {
            fetchFolders();
            handleCloseSheet();
          });
      } catch(error: any) {
        errorHandler({ error });
      }
    } else {
      useToast(t("Folder alredy exists"), "danger");
    }
  }

  const handleDeleteFolder = async (id: number) => {
    try {
      setLoading(true);
      await deleteGroup(id).then(() => setFolders((prevItems) => prevItems.filter((item) => item.id !== id)));
    } catch (e: any) {
      errorHandler(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[baseContainer, containerPadding, { backgroundColor: background }]}>
      <FoldersListComponent 
        folders={folders}
        loading={loading}
        handleDeleteFolder={onDeleteFolder}
        handleOnPressFolder={handleOnPressFolder}
      />
      <AddFolderButton onPress={onPressAddFolder} />
      <AddFolderSheet
        opened={openedSheet}
        handleClose={handleCloseSheet}
        handleSave={handleSaveFolder}
        onChangeFolderName={setFolderName}
        folderName={folderName}
      />
    </View>
  );
}
