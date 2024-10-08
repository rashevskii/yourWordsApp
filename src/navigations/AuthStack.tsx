import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  WelcomeScreen,
  AdditionalLanguageScreen, 
  MainLanguageScreen
 } from '../screens';
import { useTheme } from '../hooks';

export type AuthStackParamList = {
  Welcome: undefined;
  MainLanguage: undefined;
  AdditionLanguage: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MainLanguage" 
        component={MainLanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AdditionLanguage" 
        component={AdditionalLanguageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
