import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as OvermindProvider } from "overmind-react";
import { createOvermind } from "overmind";

import { config } from "../models";
import theme from "../constants/theme";

const overmind = createOvermind(config);

const Providers: React.FC = ({ children }) => {
  return (
    <OvermindProvider value={overmind}>
      <ThemeProvider theme={theme}>
        <Router>{children}</Router>
      </ThemeProvider>
    </OvermindProvider>
  );
};

export default Providers;
