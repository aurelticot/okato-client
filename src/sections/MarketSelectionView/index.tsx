import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListSubheader,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Switch,
} from "@material-ui/core";
import { useIntl } from "react-intl";
import { Market, SettingKey } from "../../lib/types";
import { useUserSetting } from "../../lib/hooks";
import { getMarketData } from "../../lib/utils/APImock";

export const MarketSelectionView = () => {
  const [allMarkets, setAllMarkets] = useState<Market[]>([]);
  const [marketSelection, setMarketSelection] = useUserSetting(
    SettingKey.MarketSelection
  );

  useEffect(() => {
    getMarketData().then((marketsData) => {
      setAllMarkets(
        marketsData.sort((marketA, marketB) =>
          marketA.name.localeCompare(marketB.name)
        )
      );
    });
  }, []);

  const handleToggle = (value: string) => () => {
    const currentIndex = marketSelection.indexOf(value);
    const newMarketSelection = [...marketSelection];
    if (currentIndex === -1) {
      newMarketSelection.push(value);
    } else {
      newMarketSelection.splice(currentIndex, 1);
    }
    setMarketSelection(newMarketSelection);
  };

  const i18n = useIntl();

  return (
    <Box>
      <List
        subheader={
          <ListSubheader>
            {i18n.formatMessage({
              id: "MarketSelectionView.title",
              defaultMessage: "Markets",
            })}
          </ListSubheader>
        }
      >
        {allMarkets.map((market) => {
          return (
            <ListItem key={market.code}>
              <ListItemText
                id={`switch-list-label-${market.code}`}
                primary={market.name}
                secondary={market.city}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={handleToggle(market.code)}
                  checked={marketSelection.includes(market.code)}
                  inputProps={{
                    "aria-labelledby": `switch-list-label-${market.code}`,
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
