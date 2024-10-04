import { DefaultTheme, Theme } from '@react-navigation/native';

interface AppTheme extends Theme {
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    button: string;
    card: string;
    border: string;
    notification: string;
  };
}

export const lightTheme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
    primary: '#6200ea',
    secondary: '#03dac6',
    button: '#E7D6C8',
  },
};

export const darkTheme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000',
    text: '#ffffff',
    primary: '#bb86fc',
    secondary: '#03dac6',
    button: '#bb86fc',
  },
};