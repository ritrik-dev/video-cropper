import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import index from "./Components";

const ThemeProviderIndex = (props) => {
  const { children } = props;

  const themeObj = {};

  const theme = createTheme(themeObj);
  theme.components = index(theme);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderIndex;
