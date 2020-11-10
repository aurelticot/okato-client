import React from "react";
import { Box } from "@material-ui/core";
import { Market } from "lib/types";
import { Timeline, TimelineItemHeader } from "./components";

interface Props {
  market: Market;
  time: Date | null;
}

export const TimelineItem: React.FunctionComponent<Props> = ({
  market,
  time,
}) => {
  return (
    <Box>
      <TimelineItemHeader time={time} market={market} />
      <Timeline sessions={market.sessions} timezone={market.timezone} />
    </Box>
  );
};
