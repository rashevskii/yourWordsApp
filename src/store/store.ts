import {
  configureStore,
} from '@reduxjs/toolkit';
import { appSlice } from './actions';

// Конфигурация стора
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

// Типизация для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;