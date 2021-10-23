import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { SettingKey, SettingDialogConfiguration } from "lib/types";
import { useUserSetting } from "lib/hooks";

interface Props {
  onClick: (configuration: SettingDialogConfiguration) => void;
}

export const TimeFormatSettingItem: React.FunctionComponent<Props> = ({
  onClick,
}) => {
  const i18n = useIntl();

  const [timeFormat, setTimeFormat, timeFormatSettingsDefinition] =
    useUserSetting(SettingKey.TimeFormat);

  const selectedTimeFormatDefinition =
    timeFormatSettingsDefinition.values.filter((valueDefinition) => {
      return valueDefinition.key === timeFormat;
    })[0];

  const dialogConfiguration: SettingDialogConfiguration = {
    title: i18n.formatMessage({
      id: "settings.timeFormat.selectionDialog.title",
      defaultMessage: "Select a time format",
      description:
        "Title of the dialog listing the time format options to select from",
    }),
    selectedValue: timeFormat,
    values: timeFormatSettingsDefinition.values,
    applyValue: setTimeFormat,
  };

  return (
    <ListItem button onClick={() => onClick(dialogConfiguration)}>
      <ListItemIcon>
        <AccessTimeIcon />
      </ListItemIcon>
      <ListItemText
        primary={i18n.formatMessage(timeFormatSettingsDefinition.labelMessage)}
        secondary={
          typeof selectedTimeFormatDefinition.labelMessage === "string"
            ? selectedTimeFormatDefinition.labelMessage
            : i18n.formatMessage(selectedTimeFormatDefinition.labelMessage)
        }
      />
    </ListItem>
  );
};
