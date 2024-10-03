import React from 'react';
import { Button, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, RootState, AppDispatch } from '../store'; // Импорт экшенов и типов

export const ThemeSwitcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.appSettings.theme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <View>
      <Text>Current theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};
