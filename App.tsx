import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const isAuth = useSelector((state: RootState) => state.app.isAuthenticated);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {isAuth ? (
        <Text>Authentificated</Text>
      ) : (
        <Text>Not Authentificated</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
