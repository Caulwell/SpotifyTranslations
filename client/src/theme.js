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

  lightPrimary: "#F4F6F6",
  midPrimary: "#E9EDED",
  darkPrimary: "#8FA3A3",
  selected: "#495A5A",

  text: '#131515',
  buttonText: "#E9EFC0",
  
};

export const darkTheme = {
  body: '#19191d',
  lighter: "#1d1d23",
  darker: "#343438",
  flair: "#e91e63",
  text: '#fafafa',
};