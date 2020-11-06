import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { MarketTitle } from "./MarketTitle";
import { RealTimeClock } from "../../../lib/components/RealTimeClock";
import { MarketNextEvent } from "./MarketNextEvent";
import { Clock } from "../../../lib/components/Clock";
import { Market, MarketStatus } from "../../../lib/types";
import { useMarketStatus, useMarketNextEvent } from "../../../lib/hooks";

const useStyles = makeStyles((theme) => ({
  timelineHeaderPlaceholder: {
    height: "1.6em",
  },
  timelineHeaderWrapper: {
    width: "100%",
    padding: `0 ${theme.spacing(1)}px`,
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerComponent: {
    flexBasis: "33.3333%",
  },
  timelineClock: {
    position: "relative",
  },
  marketOpen: {
    color: theme.palette.success.main,
  },
  marketClosed: {
    color: theme.palette.error.main,
  },
  marketAfterBeforeHour: {
    color: theme.palette.warning.main,
  },
}));

const defineMarketStatusClass = (
  status: MarketStatus,
  classes: Record<string, string>
): string => {
  switch (status) {
    case MarketStatus.OPEN:
    case MarketStatus.BREAK:
      return classes.marketOpen;
    case MarketStatus.CLOSE:
    case MarketStatus.CLOSE_SPECIAL:
      return classes.marketClosed;
    case MarketStatus.BEFORE_MARKET:
    case MarketStatus.AFTER_MARKET:
      return classes.marketAfterBeforeHour;
    default:
      return ``;
  }
};

interface Props {
  time: Date | null;
  market: Market;
}

export const TimelineItemHeader = (props: Props) => {
  const { time, market } = props;
  const classes = useStyles(props);
  const status = useMarketStatus(market, true, time);
  const nextEvent = useMarketNextEvent(market, true);

  const marketStatusClass = defineMarketStatusClass(status, classes);

  return (
    <Box className={classes.timelineHeaderPlaceholder}>
      <Box className={`${classes.timelineHeaderWrapper} ${marketStatusClass}`}>
        <Box
          className={`${classes.headerComponent}`}
          display="flex"
          justifyContent="flex-start"
        >
          <MarketTitle market={market} time={time} />
        </Box>
        <Box
          className={`${classes.headerComponent} ${classes.timelineClock}`}
          display="flex"
          justifyContent="center"
        >
          {time && (
            <Clock
              time={time}
              timezone={market.timezone}
              displayTimezone
              displayDayDiff
            />
          )}
          {!time && (
            <RealTimeClock
              timezone={market.timezone}
              displayTimezone
              displayDayDiff
            />
          )}
        </Box>
        <Box
          className={classes.headerComponent}
          display="flex"
          justifyContent="flex-end"
        >
          {nextEvent && !time && <MarketNextEvent nextEvent={nextEvent} />}
        </Box>
      </Box>
    </Box>
  );
};
