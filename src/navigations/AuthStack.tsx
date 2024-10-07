import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectLanguages } from '../screens';
import { WelcomeScreen } from '../screens';
import { useTheme } from '../hooks';

export type AuthStackParamList = {
  SelectLanguages: undefined;
  Welcome: undefined;
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
        name="SelectLanguages" 
        component={SelectLanguages}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
