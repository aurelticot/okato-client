import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Translate as LanguageIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { SettingKey, SettingDialogConfiguration } from "lib/types";
import { useUserSetting } from "lib/hooks";

interface Props {
  onClick: (configuration: SettingDialogConfiguration) => void;
}

export const LanguageSettingItem: React.FunctionComponent<Props> = ({
  onClick,
}) => {
  const i18n = useIntl();

  const [language, setLanguage, languagesSettingsDefinition] = useUserSetting(
    SettingKey.Language
  );

  const selectedLanguageDefinition = languagesSettingsDefinition.values.filter(
    (valueDefinition) => {
      return valueDefinition.key === language;
    }
  )[0];

  const dialogConfiguration: SettingDialogConfiguration = {
    title: i18n.formatMessage({
      id: "settings.language.selectionDialog.title",
    }),
    selectedValue: language,
    values: languagesSettingsDefinition.values,
    applyValue: setLanguage,
  };

  return (
    <ListItem button onClick={() => onClick(dialogConfiguration)}>
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
  );
};
