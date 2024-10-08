import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguagesType, UILanguagesType } from "../data";

// Интерфейс стейта
interface IAppState {
  isAuthenticated: boolean;
  theme: 'dark' | 'light';
  language: UILanguagesType;
  mainLanguage: LanguagesType | null;
  additionalLanguage: LanguagesType | null;
}

// Начальное состояние
const initialState: IAppState = {
  isAuthenticated: false,
  theme: 'light',
  language: 'ru',
  mainLanguage: null,
  additionalLanguage: null,
};

// Слайс для обработки стейта
const appSettingsSlice = createSlice({
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
    setLanguage: (state, action: PayloadAction<UILanguagesType>) => {
      state.language = action.payload;
    },
    setMainLanguage: (state, action: PayloadAction<LanguagesType>) => {
      state.mainLanguage = action.payload;
    },
    setAdditionaLanguage: (state, action: PayloadAction<LanguagesType>) => {
      state.additionalLanguage = action.payload;
    }
  },
});

// Экспорт экшенов для использования в компонентах
export const { 
  setAuthentication, 
  setTheme, 
  setLanguage,
  setMainLanguage,
  setAdditionaLanguage
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;