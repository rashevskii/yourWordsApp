export interface Theme {
  background: string;
  text: string;
  buttonBackground: string;
  buttonText: string;
}

export const lightTheme: Theme = {
  background: '#ffffff',
  text: '#000000',
  buttonBackground: '#007bff',
  buttonText: '#ffffff',
};

export const darkTheme: Theme = {
  background: '#000000',
  text: '#ffffff',
  buttonBackground: '#333333',
  buttonText: '#ffffff',
};