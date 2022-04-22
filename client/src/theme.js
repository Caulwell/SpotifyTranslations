import { createGlobalStyle } from 'styled-components';


export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

export const lightTheme = {
  body: '#fff',
  secondaryBody: "#E1E2DF",
  text: '#131515',
  buttonText: "#E9EFC0",
  flair1: "#48D59B",
  flair2: "#26A671",
  
};

export const darkTheme = {
  body: '#131515',
  secondaryBody: "#2B2C28",
  text: '#FBF5F3',
  buttonText: '#FBF5F3',
  flair1: "#48D59B",
  flair2: "#26A671",
};