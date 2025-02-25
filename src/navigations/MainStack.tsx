import React, { FC, useEffect } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { BottomTabs } from './BottomTabsStack';
import {
  SettingsScreen,
  WordsRouteProp,
  WordsScreen
} from '../screens';
import { 
  BackIconComponent, 
  HeaderComponent, 
  SettingsIconComponent 
} from '../components';
import { createTables } from '../database';
import { useTranslation } from 'react-i18next';

export type MainStackParamList = {
  BottomTabs: undefined;
  Words: {
    idFolder: number | null;
    folderName: string;
  };
  Settings: undefined;
};

export type WordsScreenProps = StackScreenProps<MainStackParamList, 'Words'>;

const MainStack = createStackNavigator<MainStackParamList>();

export const MainStackNavigator: FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const initDB = async () => {
      await createTables();
    };
    initDB();
  }, []);

  return (
    <MainStack.Navigator>
      <MainStack.Screen 
        name="BottomTabs" 
        component={BottomTabs}
        options={{ headerShown: false }} 
      />
      <MainStack.Screen 
        name="Words" 
        component={WordsScreen} 
        options={{ 
          header: ({ route }) => 
            <HeaderComponent 
              leftIcon={() => <BackIconComponent />}
              rightIcon={() => <SettingsIconComponent />} 
              title={(route as WordsRouteProp).params.folderName}
            />
         }} 
      />
      <MainStack.Screen 
        name="Settings"
        component={SettingsScreen}
        options={{ 
          header: () => 
            <HeaderComponent
              title={t("Settings")}
            />
         }} 
      />
    </MainStack.Navigator>
  );
};
