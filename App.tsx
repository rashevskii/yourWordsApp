import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
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
  AppStack, 
  AuthStack 
} from './src/navigations';
import { globalStyles } from './src/styles';
import { useTheme } from './src/hooks';

export const App: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const isAuth = useSelector((state: RootState) => state.appSettings.isAuthenticated);

  return (
    <SafeAreaView style={globalStyles.baseContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer>
        {isAuth ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});