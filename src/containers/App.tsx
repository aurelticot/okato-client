import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { TimelineView } from "./TimelineView";
import { ApplicationBar } from "../components";
import { SettingsView } from "./SettingsView";
import { MarketSelectionView } from "./MarketSelectionView";

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: "10px",
    fontSize: "1.1em",
  },
}));

export const App = () => {
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
