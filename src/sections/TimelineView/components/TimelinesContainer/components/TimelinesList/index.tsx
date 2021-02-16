import React from "react";
import { Box, CircularProgress, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Market } from "lib/types";
import { TimelineItem, TimelineRuler } from "./components";

const useStyles = makeStyles((theme) => ({
  timelineList: {
    position: "inherit",
    padding: "0",
  },
  timelineListItemRuler: {
    padding: `0`,
    position: "inherit",
    display: "block",
  },
  timelineListItem: {
    padding: `${theme.custom.mixins.fluidLength(0.5)} 0`,
    position: "inherit",
    display: "block",
  },
  loadingContainer: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: `${theme.custom.mixins.fluidLength(1)} 0`,
  },
}));

interface Props {
  markets: Market[] | null;
  baseTime: Date | null;
}

export const TimelinesList: React.FunctionComponent<Props> = ({
  baseTime,
  markets,
}) => {
  const classes = useStyles();
  return (
    <>
      <List className={classes.timelineList}>
        <ListItem key={`_ruler`} className={classes.timelineListItemRuler}>
          <TimelineRuler baseTime={baseTime} />
        </ListItem>
        {markets?.map((market) => {
          return (
            <ListItem key={market.id} className={classes.timelineListItem}>
              <TimelineItem baseTime={baseTime} market={market} />
            </ListItem>
          );
        })}
      </List>
      {!markets && (
        <Box className={classes.loadingContainer}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  );
};
