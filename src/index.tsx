import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { config } from "config";
import { initTelemetry } from "lib/utils";
import { AppContextProvider } from "lib/contexts";
import { ErrorHandler, AppHandlers } from "lib/handlers";
import { App } from "./App";

const { raygunAPIKey, enableCrashReporting, enableMonitoring, appVersion } =
  config;

// TODO set the env tag in telemetry
initTelemetry({
  raygunAPIKey,
  enableCrashReporting,
  enableMonitoring,
  appVersion,
  debugMode: config.nodeEnv === "development",
  breadcrumbLevel: config.nodeEnv === "development" ? "debug" : "info",
  tags: [`env:${config.envType}`],
});

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
