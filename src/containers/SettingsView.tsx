import React, { useState } from "react";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@material-ui/core";
import {
  InvertColors as InvertColorsIcon,
  Translate as LanguageIcon,
  SortByAlpha as SortByAlphaIcon,
} from "@material-ui/icons";
import { useIntl } from "react-intl";
import { SettingKey, SettingValue } from "../lib/types";
import { useUserSetting } from "../lib/hooks";
import { SettingSelectionDialog } from "../components";

export const SettingsView = () => {
  interface DialogProps {
    title: string;
    selectedValue: string | string[];
    values: SettingValue[];
    onClose: (value: string | string[]) => void;
  }

  const emptyDialogProps: DialogProps = {
    title: "",
    selectedValue: "",
    values: [],
    onClose: () => {},
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogProps>(emptyDialogProps);

  const openDialog = (settingsDialogProps: DialogProps) => {
    setDialogProps(settingsDialogProps);
    setDialogOpen(true);
  };

  const closeDialog = (value: string | string[]) => {
    dialogProps.onClose(value);
    setDialogOpen(false);
  };

  const i18n = useIntl();
  const settingsViewTitle = i18n.formatMessage({
    id: "SettingsView.title",
    defaultMessage: "Settings",
    description: "Title of the Settings view",
  });

  const [theme, setTheme, themesSettingsDefinition] = useUserSetting(
    SettingKey.Theme
  );
  const selectedThemeDefinition = themesSettingsDefinition.values.filter(
    (valueDefinition) => {
      return valueDefinition.key === theme;
    }
  )[0];
  const themeDialogConfiguration = {
    title: i18n.formatMessage({ id: "settings.theme.selectionDialog.title" }),
    selectedValue: theme,
    values: themesSettingsDefinition.values,
    onClose: setTheme,
  };

  const [language, setLanguage, languagesSettingsDefinition] = useUserSetting(
    SettingKey.Language
  );
  const selectedLanguageDefinition = languagesSettingsDefinition.values.filter(
    (valueDefinition) => {
      return valueDefinition.key === language;
    }
  )[0];
  const languageDialogConfiguration = {
    title: i18n.formatMessage({
      id: "settings.language.selectionDialog.title",
    }),
    selectedValue: language,
    values: languagesSettingsDefinition.values,
    onClose: setLanguage,
  };

  const [
    marketSort,
    setMarketSort,
    marketSortSettingsDefinition,
  ] = useUserSetting(SettingKey.MarketSort);
  const selectedMarketSortDefinition = marketSortSettingsDefinition.values.filter(
    (valueDefinition) => {
      return valueDefinition.key === marketSort;
    }
  )[0];
  const marketSortDialogConfiguration = {
    title: i18n.formatMessage({
      id: "settings.marketSort.selectionDialog.title",
    }),
    selectedValue: marketSort,
    values: marketSortSettingsDefinition.values,
    onClose: setMarketSort,
  };

  return (
    <Box>
      <List subheader={<ListSubheader>{settingsViewTitle}</ListSubheader>}>
        <ListItem button onClick={() => openDialog(themeDialogConfiguration)}>
          <ListItemIcon>
            <InvertColorsIcon />
          </ListItemIcon>
          <ListItemText
            primary={i18n.formatMessage({
              id: themesSettingsDefinition.localizedLabelKey,
            })}
            secondary={i18n.formatMessage({
              id: selectedThemeDefinition.localizedLabelKey,
            })}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => openDialog(languageDialogConfiguration)}
        >
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText
            primary={i18n.formatMessage({
              id: languagesSettingsDefinition.localizedLabelKey,
            })}
            secondary={i18n.formatMessage({
              id: selectedLanguageDefinition.localizedLabelKey,
            })}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => openDialog(marketSortDialogConfiguration)}
        >
          <ListItemIcon>
            <SortByAlphaIcon />
          </ListItemIcon>
          <ListItemText
            primary={i18n.formatMessage({
              id: marketSortSettingsDefinition.localizedLabelKey,
            })}
            secondary={i18n.formatMessage({
              id: selectedMarketSortDefinition.localizedLabelKey,
            })}
          />
        </ListItem>
      </List>
      <SettingSelectionDialog
        open={dialogOpen}
        {...dialogProps}
        onClose={closeDialog}
      />
    </Box>
  );
};
