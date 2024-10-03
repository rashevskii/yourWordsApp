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

export const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const isAuth = useSelector((state: RootState) => state.appSettings.isAuthenticated);
  console.log("isAuth", isAuth);
  

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={globalStyles.baseContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        {isAuth ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});