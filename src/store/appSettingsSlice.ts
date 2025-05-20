import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguagesType, UILanguagesType } from "../types";

interface IAppState {
  isAuthenticated: boolean;
  theme: 'dark' | 'light';
  language: UILanguagesType;
  mainLanguage: LanguagesType;
  additionalLanguage: LanguagesType | null;
  nativeLanguage: UILanguagesType;
}

const initialState: IAppState = {
  isAuthenticated: false,
  theme: 'light',
  language: 'ru',
  mainLanguage: "en",
  additionalLanguage: null,
  nativeLanguage: "ru",
};

const appSettingsSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<UILanguagesType>) => {
      state.language = action.payload;
    },
    setMainLanguage: (state, action: PayloadAction<LanguagesType>) => {
      state.mainLanguage = action.payload;
    },
    setAdditionaLanguage: (state, action: PayloadAction<LanguagesType | null>) => {
      state.additionalLanguage = action.payload;
    },
    setNativeLanguge: (state, action: PayloadAction<UILanguagesType>) => {
      state.nativeLanguage = action.payload;
    }
  },
});

export const { 
  setAuthentication, 
  setTheme, 
  setLanguage,
  setMainLanguage,
  setAdditionaLanguage,
  setNativeLanguge,
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;