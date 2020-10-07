import React from "react";
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
import { SettingKey } from "../../lib/types";
import { useUserSetting } from "../../lib/hooks";
import { useQuery } from "@apollo/client";
import { MARKETS } from "../../lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "../../lib/graphql/queries/Markets/types/Markets";
import { MarketSortingMethod } from "../../lib/types/globalTypes";

const PAGE_LIMIT = 10;

export const MarketSelectionView = () => {
  const [marketSelection, setMarketSelection] = useUserSetting<string[]>(
    SettingKey.MarketSelection
  );
  const { data } = useQuery<MarketsData, MarketsVariables>(MARKETS, {
    variables: {
      sort: MarketSortingMethod.ALPHABETICALLY,
      page: 1,
      limit: PAGE_LIMIT,
      startDate: "",
      endDate: "",
      withSessions: false,
    },
  });

  const markets = data ? data.markets : null;

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
        {markets &&
          markets.result.map((market) => {
            const itemId = `switch-list-label-${market.code}`;
            return (
              <ListItem key={market.code}>
                <ListItemText
                  id={itemId}
                  primary={market.name}
                  secondary={market.city}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    color="primary"
                    onChange={handleToggle(market.code)}
                    checked={marketSelection.includes(market.code)}
                    inputProps={{
                      "aria-labelledby": itemId,
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
