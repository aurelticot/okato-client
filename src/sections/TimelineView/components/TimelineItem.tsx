import React from "react";
import { Box } from "@material-ui/core";
import { TimelineItemHeader } from "./TimelineItemHeader";
import { Timeline } from "./Timeline";
import { Market } from "../../../lib/types";

interface Props {
  market: Market;
  time: Date | null;
}

export const TimelineItem = ({ market, time }: Props) => {
  return (
    <Box>
      <TimelineItemHeader time={time} market={market} />
      <Timeline
        sessions={market.sessions}
        timezone={market.timezone}
        displayTimeMarker
      />
    </Box>
  );
};
