import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "lib/contexts";
import { ErrorHandler, AppHandlers } from "lib/handlers";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ErrorHandler raw>
      <AppContextProvider>
        <AppHandlers />
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </AppContextProvider>
    </ErrorHandler>
  </React.StrictMode>,
  document.getElementById("root")
);
