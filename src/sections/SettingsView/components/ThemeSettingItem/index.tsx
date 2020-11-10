import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { InvertColors as InvertColorsIcon } from "@material-ui/icons";
import { useIntl } from "react-intl";
import { SettingKey } from "lib/types";
import { useUserSetting } from "lib/hooks";
import { SettingDialogConfiguration } from "sections/SettingsView/types";

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
    title: i18n.formatMessage({ id: "settings.theme.selectionDialog.title" }),
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
        primary={i18n.formatMessage({
          id: themesSettingsDefinition.localizedLabelKey,
        })}
        secondary={i18n.formatMessage({
          id: selectedThemeDefinition.localizedLabelKey,
        })}
      />
    </ListItem>
  );
};
