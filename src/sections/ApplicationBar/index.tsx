import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Box, IconButton } from "@material-ui/core";
import {
  ClearAll as TimelineIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.default,
    top: "auto",
    bottom: 0,
  },
}));

export const ApplicationBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Box width="100%" display="flex" justifyContent="space-between">
          <IconButton edge="start" component={Link} to="/">
            <TimelineIcon />
          </IconButton>
          <IconButton component={Link} to="/selection">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" component={Link} to="/settings">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
