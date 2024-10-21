import { store } from "../store"

export const useAppSettings = () => {
  return store.getState().appSettings;
}