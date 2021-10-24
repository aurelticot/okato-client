import React, { useState } from "react";
import { List } from "@mui/material";
import { SettingDialogConfiguration } from "lib/types";
import {
  SettingSelectionDialog,
  LanguageSettingItem,
  MarketSortSettingItem,
  ThemeSettingItem,
  TimeFormatSettingItem,
} from "components/organisms";

const emptyDialogProps: SettingDialogConfiguration = {
  title: "",
  selectedValue: "",
  values: [],
  applyValue: () => {},
};

export const SettingsList: React.FunctionComponent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfiguration, setDialogConfiguration] =
    useState<SettingDialogConfiguration>(emptyDialogProps);

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

  return (
    <>
      <List sx={{ p: 0 }}>
        <ThemeSettingItem onClick={openDialog} />
        <LanguageSettingItem onClick={openDialog} />
        <TimeFormatSettingItem onClick={openDialog} />
        <MarketSortSettingItem onClick={openDialog} />
      </List>
      <SettingSelectionDialog
        open={dialogOpen}
        {...dialogConfiguration}
        onClose={closeDialog}
      />
    </>
  );
};
