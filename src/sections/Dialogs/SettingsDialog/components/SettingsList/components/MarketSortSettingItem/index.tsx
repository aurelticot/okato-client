import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { SortByAlpha as SortByAlphaIcon } from "@material-ui/icons";
import { useIntl } from "react-intl";
import { SettingKey } from "lib/types";
import { useUserSetting } from "lib/hooks";
import { SettingDialogConfiguration } from "../../types";

interface Props {
  onClick: (configuration: SettingDialogConfiguration) => void;
}

export const MarketSortSettingItem: React.FunctionComponent<Props> = ({
  onClick,
}) => {
  const i18n = useIntl();

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
  const dialogConfiguration: SettingDialogConfiguration = {
    title: i18n.formatMessage({
      id: "settings.marketSort.selectionDialog.title",
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
        primary={i18n.formatMessage({
          id: marketSortSettingsDefinition.localizedLabelKey,
        })}
        secondary={i18n.formatMessage({
          id: selectedMarketSortDefinition.localizedLabelKey,
        })}
      />
    </ListItem>
  );
};
