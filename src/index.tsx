import React from "react";
import ReactDOM from "react-dom";
import { initTelemetry } from "lib/utils";
import { AppContextProvider } from "lib/contexts";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

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

serviceWorker.unregister();
