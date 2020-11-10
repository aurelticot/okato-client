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
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import { SettingKey, MarketSortingMethod } from "lib/types";
import { useUserSetting } from "lib/hooks";
import { useQuery } from "@apollo/client";
import { MARKETS } from "lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "lib/graphql/queries/Markets/types/Markets";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.mixins.toolbar.minHeight,
  },
}));

const PAGE_LIMIT = 10;

export const MarketSelectionView: React.FunctionComponent<{}> = () => {
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

  const classes = useStyles();
  return (
    <Box className={classes.root}>
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
                    color="default"
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
