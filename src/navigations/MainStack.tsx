import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabs } from './BottomTabsStack';

export type MainStackParamList = {
  Home: undefined;
  BottomTabs: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
