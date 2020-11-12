import React from "react";
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Market } from "lib/types";
import { TimelineItem, TimelineRuler } from "./components";

const useStyles = makeStyles((theme) => ({
  timelineList: {
    position: "inherit",
  },
  timelineListItem: {
    padding: `${theme.custom.mixins.fluidLength(0.5)} 0`,
    position: "inherit",
    display: "block",
  },
}));

interface Props {
  markets: Market[];
  baseTime: Date | null;
}

export const TimelinesList: React.FunctionComponent<Props> = ({
  baseTime,
  markets,
}) => {
  const classes = useStyles();
  return (
    <List className={classes.timelineList}>
      <ListItem key={`_ruler`} className={classes.timelineListItem}>
        <TimelineRuler baseTime={baseTime} />
      </ListItem>
      {markets.map((market) => {
        return (
          <ListItem key={market.id} className={classes.timelineListItem}>
            <TimelineItem
              baseTime={baseTime}
              market={{ ...market, hasReminder: false, isBookmarked: false }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
