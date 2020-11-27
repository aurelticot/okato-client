import React from "react";
import {
  Box,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Switch,
} from "@material-ui/core";
import { Room as LocationIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { SettingKey, MarketSortingMethod } from "lib/types";
import { useUserSetting } from "lib/hooks";
import { useQuery } from "@apollo/client";
import { MARKETS } from "lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "lib/graphql/queries/Markets/types/Markets";

const useStyles = makeStyles((theme) => ({
  list: {
    padding: "0",
  },
  secondaryTextWrapper: {
    display: "flex",
    alignItems: "center",
  },
  secondaryTextIcon: {
    fontSize: "0.875rem",
    marginRight: theme.spacing(0.5),
  },
}));

const PAGE_LIMIT = 20;

export const MarketSelectionList: React.FunctionComponent<{}> = () => {
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

  const classes = useStyles();
  return (
    <List className={classes.list}>
      {markets &&
        markets.result.map((market) => {
          const itemId = `switch-list-label-${market.id}`;
          return (
            <ListItem key={market.id}>
              <ListItemText
                id={itemId}
                primary={`${market.shortName} - ${market.name}`}
                secondary={
                  <Box
                    component={"span"}
                    className={classes.secondaryTextWrapper}
                  >
                    <LocationIcon className={classes.secondaryTextIcon} />
                    {` ${market.city}`}
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  color="default"
                  onChange={handleToggle(market.id)}
                  checked={marketSelection.includes(market.id)}
                  inputProps={{
                    "aria-labelledby": itemId,
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
  );
};
