import type { FC } from 'react';
import React, { useState } from 'react';
import Layout from "./layout";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import {  createTheme,ThemeProvider } from '@mui/material';
import "./App.css";

const queryClient = new QueryClient()

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: "2px 2px 2px 0px rgba(255,255,255, 0.5)",
        },
      },
    },
  },
  typography: {
    fontFamily: "inherit"
  },
});

const App: FC = () => {

  const [authenticated, setAuthenticated] = useState<boolean>(true);


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <Layout authenticated={authenticated} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
