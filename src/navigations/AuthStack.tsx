import React from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';

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

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthStackNavigator = () => {

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
      <AuthStack.Screen 
        name="InterfaceLanguage" 
        component={InterfaceLanguageScreen} 
        options={{ headerShown: false }} 
      />
      <AuthStack.Screen 
        name="MainLanguage" 
        component={MainLanguageScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen 
        name="AdditionalLanguage" 
        component={AdditionalLanguageScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen 
        name="NativeLanguage" 
        component={NativeLanguageScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen 
        name="SetNotification" 
        component={SetNotificationScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen 
        name="RatePlan" 
        component={RatePlanScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen 
        name="Start" 
        component={StartScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
