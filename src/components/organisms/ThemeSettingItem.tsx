import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { InvertColors as InvertColorsIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { SettingKey, SettingDialogConfiguration } from "lib/types";
import { useUserSetting } from "lib/hooks";

interface Props {
  onClick: (configuration: SettingDialogConfiguration) => void;
}

export const ThemeSettingItem: React.FunctionComponent<Props> = ({
  onClick,
}) => {
  const i18n = useIntl();

  const [theme, setTheme, themesSettingsDefinition] = useUserSetting(
    SettingKey.Theme
  );

  const selectedThemeDefinition = themesSettingsDefinition.values.filter(
    (valueDefinition) => {
      return valueDefinition.key === theme;
    }
  )[0];

  const dialogConfiguration: SettingDialogConfiguration = {
    title: i18n.formatMessage({
      id: "settings.theme.selectionDialog.title",
      defaultMessage: "Select a theme",
      description:
        "Title of the dialog listing the theme options to select from",
    }),
    selectedValue: theme,
    values: themesSettingsDefinition.values,
    applyValue: setTheme,
  };

  return (
    <ListItem button onClick={() => onClick(dialogConfiguration)}>
      <ListItemIcon>
        <InvertColorsIcon />
      </ListItemIcon>
      <ListItemText
        primary={i18n.formatMessage(themesSettingsDefinition.labelMessage)}
        secondary={i18n.formatMessage(selectedThemeDefinition.labelMessage)}
      />
    </ListItem>
  );
};
