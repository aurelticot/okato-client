import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { routes } from "lib/constants";
import { sendPageView } from "lib/utils";
import { TopBar } from "components/organisms";
import {
  MarketSelectionDialog,
  SettingsDialog,
  TimelinesView,
} from "components/views";

const TopBarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);

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

  return (
    <Box sx={{ px: 1 }}>
      <TopBar />
      <TopBarOffset />
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
