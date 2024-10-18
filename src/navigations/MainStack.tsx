import React, { FC } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { BottomTabs } from './BottomTabsStack';
import { WordsScreen } from '../screens';

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
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Words" component={WordsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
