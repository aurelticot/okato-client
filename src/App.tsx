import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { routes } from "lib/constants";
import { sendPageView } from "lib/utils";
import { TopBar } from "components/organisms";
import {
  MarketSelectionDialog,
  SettingsDialog,
  TimelinesView,
} from "components/views";

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

export const App: React.FunctionComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const settingsRouteMatch = useRouteMatch(routes.settings);
  const marketSelectionRouteMatch = useRouteMatch(routes.marketSelection);

  const closeDialog = () => {
    setDialogOpen(false);
    history.push(routes.home);
  };

  useEffect(() => {
    sendPageView(location.pathname);
  }, [location]);

  useEffect(() => {
    setDialogOpen(
      !!settingsRouteMatch?.isExact || !!marketSelectionRouteMatch?.isExact
    );
  }, [settingsRouteMatch, marketSelectionRouteMatch]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <TopBar />
      <Box className={classes.appContainer} />
      <Switch>
        <Route
          path={[routes.home, routes.settings, routes.marketSelection]}
          exact
        >
          <TimelinesView />
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
