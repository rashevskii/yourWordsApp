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
    primary: '#ecded2',
    secondary: '#a5a4a4',
    button: '#ecded2',
    border: "#a5a4a4",
  },
};

export const darkTheme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000',
    text: '#ffffff',
    primary: '#ecded2',
    secondary: '#a5a4a4',
    button: '#ecded2',
    border: "#ecded2",
  },
};