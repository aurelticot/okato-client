import React from "react";
import ReactDOM from "react-dom";
import AppContext from "./contexts/AppContext";
import { CssBaseline } from "@material-ui/core";
import { App } from "./containers/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <CssBaseline></CssBaseline>
      <App />
    </AppContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
