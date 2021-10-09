import React from "react";
import {
  Box,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  ListSubheader,
  Switch,
} from "@mui/material";
import { Room as LocationIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";
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
  const i18n = useIntl();

  if (!markets) {
    return (
      <List sx={{ p: 0 }}>
        <MarketSelectionListSkeleton />
      </List>
    );
  }

  const getMarketItem = (market: Market) => {
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
  };

  const selectedMarketsListSubheader = i18n.formatMessage({
    id: "MarketSelectionList.selectedMarketsListSubheader",
    description: "Subheader of the list containing the selected markets",
    defaultMessage: "Selected",
  });

  const selectedMarkets = (
    <List
      sx={{ p: 0 }}
      subheader={
        <ListSubheader
          sx={{
            backgroundColor: "background.paper",
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
          }}
        >
          {selectedMarketsListSubheader}
        </ListSubheader>
      }
    >
      {markets
        .filter((market) => selection.includes(market.id))
        .map((market) => getMarketItem(market))}
    </List>
  );

  const availableMarketsListSubheader = i18n.formatMessage({
    id: "MarketSelectionList.availableMarketsListSubheader",
    description:
      "Subheader of the list containing the availabe (non-selected) markets",
    defaultMessage: "Available",
  });

  const availableMarkets = (
    <List
      sx={{ p: 0 }}
      subheader={
        <ListSubheader
          sx={{
            backgroundColor: "background.paper",
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
          }}
        >
          {availableMarketsListSubheader}
        </ListSubheader>
      }
    >
      {markets
        .filter((market) => !selection.includes(market.id))
        .map((market) => getMarketItem(market))}
    </List>
  );

  return (
    <>
      {selectedMarkets}
      {availableMarkets}
    </>
  );
};
