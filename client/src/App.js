import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { lightTheme, darkTheme, GlobalStyles } from './theme';

const code = new URLSearchParams(window.location.search)
  .get("code");

const StyledApp = styled.div`
  background: ${props => props.theme.body}
`;

function App() {


  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";
  
  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };


  return(
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
    <GlobalStyles/>
      <StyledApp>
        {code ? <Dashboard 
          code={code} 
          toggleTheme={toggleTheme} 
          isDarkTheme={isDarkTheme}
          /> : <Login />}
      </StyledApp>
    </ThemeProvider>
  ) 

}

export default App;
