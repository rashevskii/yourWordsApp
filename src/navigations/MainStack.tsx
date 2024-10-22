import React, { FC, useEffect } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { BottomTabs } from './BottomTabsStack';
import { WordsRouteProp, WordsScreen } from '../screens';
import { 
  BackIconComponent, 
  HeaderComponent, 
  SettingsIconComponent 
} from '../components';
import { createTables } from '../database';

export type MainStackParamList = {
  BottomTabs: undefined;
  Words: {
    idFolder: string | null;
    folderName: string;
  };
};

export type WordsScreenProps = StackScreenProps<MainStackParamList, 'Words'>;

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack: FC = () => {
  useEffect(() => {
    const initDB = async () => {
      await createTables();
    };
    initDB();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BottomTabs" 
        component={BottomTabs}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
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
    </Stack.Navigator>
  );
};
