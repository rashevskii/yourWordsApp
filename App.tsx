import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { 
  useSelector 
} from 'react-redux';
import { 
  RootState,
} from './src/store';
import {
  NavigationContainer
} from '@react-navigation/native';
import { 
  MainStackNavigator, 
  AuthStackNavigator 
} from './src/navigations';
import { globalStyles } from './src/styles';
import { useTheme } from './src/hooks';
import { ToastProvider } from "react-native-toast-notifications";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const isAuth = useSelector((state: RootState) => state.appSettings.isAuthenticated);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <SafeAreaView style={globalStyles.baseContainer}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background}
          />
          <NavigationContainer>
            {isAuth ? <MainStackNavigator /> : <AuthStackNavigator />}
          </NavigationContainer>
        </SafeAreaView>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
