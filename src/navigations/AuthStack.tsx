import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  WelcomeScreen,
  AdditionalLanguageScreen, 
  MainLanguageScreen,
  NativeLanguageScreen,
  SetNotificationScreen,
  RatePlanScreen,
  StartScreen,
  InterfaceLanguageScreen
 } from '../screens';

export type AuthStackParamList = {
  Welcome: undefined;
  InterfaceLanguage: undefined;
  MainLanguage: undefined;
  AdditionalLanguage: undefined;
  NativeLanguage: undefined;
  SetNotification: undefined;
  RatePlan: undefined;
  Start: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="InterfaceLanguage" 
        component={InterfaceLanguageScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MainLanguage" 
        component={MainLanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AdditionalLanguage" 
        component={AdditionalLanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NativeLanguage" 
        component={NativeLanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SetNotification" 
        component={SetNotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RatePlan" 
        component={RatePlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Start" 
        component={StartScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
