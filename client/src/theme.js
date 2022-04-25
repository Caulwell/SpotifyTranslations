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
  lighter: "#ebebeb",
  darker: "#343438",
  flair: "#e91e63",
  text: '#131515',
  surfaceText: "#fafafa",
  
};

export const darkTheme = {
  body: '#19191d',
  lighter: "#1d1d23",
  darker: "#343438",
  flair: "#e91e63",
  text: '#fafafa',
  surfaceText: '#fafafa'
};