import React from 'react';
import Home from "../home"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "sans-serif"
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>  
      <Home />
    </ThemeProvider>
  );
}

export default App;
