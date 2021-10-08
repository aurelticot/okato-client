import React from "react";
import {
  Box,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Switch,
} from "@mui/material";
import { Room as LocationIcon } from "@mui/icons-material";
import { Markets_markets_result as Market } from "lib/graphql/queries/Markets/types/Markets";
import { MarketSelectionListSkeleton } from "components/organisms";

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
  return (
    <List sx={{ p: 0 }}>
      {!markets && <MarketSelectionListSkeleton />}
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
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LocationIcon
                      sx={{
                        fontSize: "0.875rem",
                        mr: 0.5,
                      }}
                    />
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
