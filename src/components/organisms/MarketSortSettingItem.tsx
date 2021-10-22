import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { SortByAlpha as SortByAlphaIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { SettingKey, SettingDialogConfiguration } from "lib/types";
import { useUserSetting } from "lib/hooks";

interface Props {
  onClick: (configuration: SettingDialogConfiguration) => void;
}

export const MarketSortSettingItem: React.FunctionComponent<Props> = ({
  onClick,
}) => {
  const i18n = useIntl();

  const [marketSort, setMarketSort, marketSortSettingsDefinition] =
    useUserSetting(SettingKey.MarketSort);
  const selectedMarketSortDefinition =
    marketSortSettingsDefinition.values.filter((valueDefinition) => {
      return valueDefinition.key === marketSort;
    })[0];
  const dialogConfiguration: SettingDialogConfiguration = {
    title: i18n.formatMessage({
      id: "settings.marketSort.selectionDialog.title",
      defaultMessage: "Select a sorting method",
      description:
        "Title of the dialog listing the sorting method options to select from",
    }),
    selectedValue: marketSort,
    values: marketSortSettingsDefinition.values,
    applyValue: setMarketSort,
  };

  return (
    <ListItem button onClick={() => onClick(dialogConfiguration)}>
      <ListItemIcon>
        <SortByAlphaIcon />
      </ListItemIcon>
      <ListItemText
        primary={i18n.formatMessage(marketSortSettingsDefinition.labelMessage)}
        secondary={
          typeof selectedMarketSortDefinition.labelMessage === "string"
            ? selectedMarketSortDefinition.labelMessage
            : i18n.formatMessage(selectedMarketSortDefinition.labelMessage)
        }
      />
    </ListItem>
  );
};
