import { initRaygun } from "./lib/utils";
import React from "react";
import ReactDOM from "react-dom";
import AppContext from "./contexts/AppContext";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import {
  ApplicationBar,
  MarketSelectionView,
  SettingsView,
  TimelineView,
} from "./sections";
import * as serviceWorker from "./serviceWorker";

initRaygun();

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <Box className={classes.root}>
        <Switch>
          <Route path="/" exact>
            <TimelineView />
          </Route>
          <Route path="/timeline">
            <TimelineView />
          </Route>
          <Route path="/settings">
            <SettingsView />
          </Route>
          <Route path="/selection">
            <MarketSelectionView />
          </Route>
        </Switch>
        <ApplicationBar />
      </Box>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <CssBaseline></CssBaseline>
      <App />
    </AppContext>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
