import React, { useState } from "react";
import { List, ListSubheader, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import {
  SettingSelectionDialog,
  LanguageSettingItem,
  MarketSortSettingItem,
  ThemeSettingItem,
} from "./components";
import { SettingDialogConfiguration } from "./types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.mixins.toolbar.minHeight,
  },
}));

const emptyDialogProps: SettingDialogConfiguration = {
  title: "",
  selectedValue: "",
  values: [],
  applyValue: () => {},
};

export const SettingsView = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfiguration, setDialogConfiguration] = useState<
    SettingDialogConfiguration
  >(emptyDialogProps);

  const openDialog = (
    settingsDialogConfiguration: SettingDialogConfiguration
  ) => {
    setDialogConfiguration(settingsDialogConfiguration);
    setDialogOpen(true);
  };

  const closeDialog = (value: string) => {
    dialogConfiguration.applyValue(value);
    setDialogOpen(false);
  };

  const i18n = useIntl();
  const settingsViewTitle = i18n.formatMessage({
    id: "SettingsView.title",
    defaultMessage: "Settings",
    description: "Title of the Settings view",
  });

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <List subheader={<ListSubheader>{settingsViewTitle}</ListSubheader>}>
        <ThemeSettingItem onClick={openDialog} />
        <LanguageSettingItem onClick={openDialog} />
        <MarketSortSettingItem onClick={openDialog} />
      </List>
      <SettingSelectionDialog
        open={dialogOpen}
        {...dialogConfiguration}
        onClose={closeDialog}
      />
    </Box>
  );
};
