import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import { routes } from "lib/constants";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  appTitle: {
    flexGrow: 1,
  },
}));

export const TopBar: React.FunctionComponent = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const i18n = useIntl();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (to: string) => {
    history.push(to);
    closeMenu();
  };

  const appTitle = i18n.formatMessage({
    id: "ApplicationBar.appTitle",
    description: "Name/Title of the application",
    defaultMessage: "Market Timeline",
  });

  const marketSelectionMenuItemLabel = i18n.formatMessage({
    id: "ApplicationBar.marketSelectionMenuItemLabel",
    description: "Label of the menu item for the Market Selection view",
    defaultMessage: "Market selection",
  });

  const settingsMenuItemLabel = i18n.formatMessage({
    id: "ApplicationBar.settingsMenuItemLabel",
    description: "Label of the menu item for the Settings view",
    defaultMessage: "Settings",
  });

  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Typography variant="h6" className={classes.appTitle}>
          {appTitle}
        </Typography>
        <Box>
          <IconButton
            aria-label="more"
            aria-controls="appbar.menu-more"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="appbar.menu-more"
            open={menuOpen}
            anchorEl={anchorEl}
            onClose={closeMenu}
            keepMounted
          >
            <MenuItem
              onClick={() => handleMenuItemClick(routes.marketSelection)}
            >
              {marketSelectionMenuItemLabel}
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick(routes.settings)}>
              {settingsMenuItemLabel}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
