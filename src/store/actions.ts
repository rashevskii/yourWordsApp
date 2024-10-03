import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейс стейта
interface IAppState {
  isAuthenticated: boolean;
  theme: 'dark' | 'light';
  language: 'ru' | 'uk' | 'en';
}

// Начальное состояние
const initialState: IAppState = {
  isAuthenticated: true,
  theme: 'light',
  language: 'ru',
};

// Слайс для обработки стейта
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Экшен для установки признака авторизации
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    // Экшен для изменения темы (dark/light)
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
    // Экшен для изменения языка интерфейса
    setLanguage: (state, action: PayloadAction<'ru' | 'uk' | 'en'>) => {
      state.language = action.payload;
    },
  },
});

// Экспорт экшенов для использования в компонентах
export const { setAuthentication, setTheme, setLanguage } = appSlice.actions;