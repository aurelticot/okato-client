import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { initTelemetry, sendCustomTiming, sendPageView } from "lib/utils";
import { AppContextProvider } from "lib/contexts";
import { reportWebVitals } from "lib/utils";
import { routes } from "lib/constants";
import { CssBaseline } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import {
  ApplicationBar,
  TimelineView,
  MarketSelectionDialog,
  SettingsDialog,
} from "sections";
import * as serviceWorker from "./serviceWorker";

initTelemetry();

reportWebVitals((metric) => {
  sendCustomTiming(metric.name, metric.value);
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `0 ${theme.spacing(1)}px`,
  },
  appContainer: theme.mixins.toolbar,
  dialogContent: {
    padding: theme.spacing(1),
  },
  dialogContainer: {
    backgroundColor: theme.palette.background.default,
  },
}));

const App: React.FunctionComponent = () => {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const settingsRouteMatch = useRouteMatch(routes.settings);
  const marketSelectionRouteMatch = useRouteMatch(routes.marketSelection);

  const closeDialog = () => {
    setDialogOpen(false);
    history.push(routes.home);
  };

  history.listen((location) => {
    sendPageView(location.pathname);
  });

  useEffect(() => {
    setDialogOpen(
      !!settingsRouteMatch?.isExact || !!marketSelectionRouteMatch?.isExact
    );
  }, [settingsRouteMatch, marketSelectionRouteMatch]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <ApplicationBar />
      <Box className={classes.appContainer} />
      <Switch>
        <Route
          path={[routes.home, routes.settings, routes.marketSelection]}
          exact
        >
          <TimelineView />
        </Route>
      </Switch>
      <MarketSelectionDialog
        open={dialogOpen && !!marketSelectionRouteMatch?.isExact}
        onClose={closeDialog}
      />
      <SettingsDialog
        open={dialogOpen && !!settingsRouteMatch?.isExact}
        onClose={closeDialog}
      />
    </Box>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <CssBaseline></CssBaseline>
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
