import {AppRegistry, LogBox} from 'react-native';
import { App } from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import './src/locales/i18n';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

LogBox.ignoreLogs(['[Reanimated]']);

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider
          theme={MD3LightTheme}
          settings={{
            icon: (props) => <MaterialCommunityIcons {...props} />,
          }}
        >
          <App />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
