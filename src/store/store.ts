import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import appSettingsReducer from './appSettingsSlice';
import remindersReducer from "./remindersSlice";

// Настройка для persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Используем AsyncStorage для хранения данных
  whitelist: ['appSettings', 'reminders'], // Указываем, какие данные сохранять
};

// Комбинирование редюсеров
const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  reminders: remindersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store с использованием persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку сериализуемости, так как `redux-persist` сохраняет функции
    }),
});

// Создаем persistor для управления состоянием persist
export const persistor = persistStore(store);

// Типизация для использования в проекте
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;