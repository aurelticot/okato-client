import React from "react";
import { Box } from "@mui/material";
import { Market } from "lib/types";
import { Timeline, TimelineItemHeader } from "components/organisms";

interface Props {
  market: Market;
  baseTime: Date | null;
}

export const TimelineItem: React.FunctionComponent<Props> = ({
  market,
  baseTime,
}) => {
  return (
    <Box component="article">
      <TimelineItemHeader baseTime={baseTime} market={market} />
      <Timeline segments={market.timeline} />
    </Box>
  );
};
