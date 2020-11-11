import { initRaygun } from "lib/utils";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AppContextProvider } from "lib/contexts";
import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
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
  MarketSelectionView,
  SettingsView,
  TimelineView,
} from "sections";
import * as serviceWorker from "./serviceWorker";
import { useIntl } from "react-intl";

initRaygun();

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  appContainer: theme.mixins.toolbar,
  dialogContent: {
    padding: theme.spacing(1),
  },
  dialogContainer: {
    backgroundColor: theme.palette.background.default,
  },
}));

const App: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const settingsRouteMatch = useRouteMatch("/settings");
  const marketSelectionRouteMatch = useRouteMatch("/selection");
  const theme = useTheme();
  const fullscreenDialog = useMediaQuery(theme.breakpoints.down("xs"));
  const i18n = useIntl();

  const closeDialog = () => {
    history.goBack();
    setDialogOpen(false);
  };

  useEffect(() => {
    setDialogOpen(
      !!settingsRouteMatch?.isExact || !!marketSelectionRouteMatch?.isExact
    );
  }, [settingsRouteMatch, marketSelectionRouteMatch]);

  const modalCloseButtonLabel = i18n.formatMessage({
    id: "App.modalDialog.closeButtonLabel",
    description: "Label of the the 'Close' button in the main dialog",
    defaultMessage: "Close",
  });

  const settingsModalTitle = i18n.formatMessage({
    id: "App.modalDialog.settingsTitle",
    description: "Title of the Settings dialog",
    defaultMessage: "Settings",
  });

  const marketSelectionModalTitle = i18n.formatMessage({
    id: "App.modalDialog.marketSelectionTitle",
    description: "Title of the Market Selection dialog",
    defaultMessage: "Market Selection",
  });

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
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        fullWidth={true}
        maxWidth="sm"
        scroll="paper"
        fullScreen={fullscreenDialog}
        classes={
          fullscreenDialog
            ? {
                paper: classes.dialogContainer,
              }
            : {}
        }
      >
        <DialogTitle>
          {!!settingsRouteMatch?.isExact && settingsModalTitle}
          {!!marketSelectionRouteMatch?.isExact && marketSelectionModalTitle}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {!!settingsRouteMatch?.isExact && <SettingsView />}
          {!!marketSelectionRouteMatch?.isExact && <MarketSelectionView />}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{modalCloseButtonLabel}</Button>
        </DialogActions>
      </Dialog>
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
