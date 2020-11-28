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
import { Markets_markets_result as Market } from "lib/graphql/queries/Markets/types/Markets";

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

interface Props {
  markets: Market[] | null;
  selection: string[];
  onSelection: (marketId: string) => void;
}

export const MarketSelectionList: React.FunctionComponent<Props> = ({
  markets,
  selection,
  onSelection,
}) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {markets &&
        markets.map((market) => {
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
                  onChange={() => onSelection(market.id)}
                  checked={selection.includes(market.id)}
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
