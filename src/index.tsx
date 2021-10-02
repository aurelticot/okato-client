import React from "react";
import ReactDOM from "react-dom";
import { initTelemetry } from "lib/utils";
import { AppContextProvider } from "lib/contexts";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

initTelemetry();

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
