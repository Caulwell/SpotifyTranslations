import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import Dashboard from './Dashboard';
import Header from './Header';
import Login from './Login';
import { lightTheme, darkTheme, GlobalStyles } from './theme';

const code = new URLSearchParams(window.location.search)
  .get("code");

const StyledApp = styled.div`
  background: ${props => props.theme.body}
`;

function App() {

  useEffect(() => {
    console.log("re render");
  },[])

  const [theme, setTheme] = useState("light");
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
