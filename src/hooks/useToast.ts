import { Toast } from 'react-native-toast-notifications';

export const useToast = (
  text: string, 
  type: string = "normal",
  duration: number = 2000
) => {
  Toast.show(
    text, 
    { 
      type,
      duration,
      placement: "top"
    }
  );
}