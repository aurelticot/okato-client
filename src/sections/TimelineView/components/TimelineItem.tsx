import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { TimelineItemHeader } from "./TimelineItemHeader";
import { Timeline } from "./Timeline";
import { Market } from "../../../lib/types";

const useStyles = makeStyles((_theme) => ({
  root: {
    paddingTop: "5px",
    paddingBottom: "5px",
  },
}));

interface Props {
  market: Market;
  time: Date | null;
}

export const TimelineItem = ({ market, time }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TimelineItemHeader time={time} market={market} />
      <Timeline
        sessions={market.sessions}
        timezone={market.timezone}
        displayTimeMarker
      />
    </Box>
  );
};
