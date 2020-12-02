import { initRaygun } from "lib/utils";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AppContextProvider } from "lib/contexts";
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

const raygun = initRaygun();

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
  const settingsRouteMatch = useRouteMatch("/settings");
  const marketSelectionRouteMatch = useRouteMatch("/selection");

  const closeDialog = () => {
    setDialogOpen(false);
    history.push("/");
  };

  history.listen((location) => {
    raygun("trackEvent", {
      type: "pageView",
      path: location.pathname,
    });
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
        <Route path={["/", "/settings", "/selection"]} exact>
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
