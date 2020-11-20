import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { MarketTitle, MarketNextEvent } from "./components";
import { Market, MarketStatus } from "lib/types";
import { useMarketStatus, useMarketNextEvent } from "lib/hooks";
import { FluidText, Clock, RealTimeClock } from "lib/components";
import { getFluidTextValues } from "lib/utils";

const mainFluidText = getFluidTextValues(1);

const useStyles = makeStyles((theme) => ({
  timelineHeaderPlaceholder: {
    visibility: "hidden",
  },
  timelineHeaderWrapper: {
    width: "100%",
    padding: `0 ${theme.spacing(1)}px`,
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  componentTitle: {
    flexBasis: "25%",
    maxWidth: "25%",
  },
  componentClock: {
    flexBasis: "50%",
    maxWidth: "50%",
  },
  componentNextEvent: {
    flexBasis: "25%",
    maxWidth: "25%",
    display: "flex",
    justifyContent: "flex-end",
  },
  marketOpen: {
    color: theme.custom.palette.marketStatus.open.main,
  },
  marketClosed: {
    color: theme.custom.palette.marketStatus.close.main,
  },
  marketAfterBeforeHour: {
    color: theme.custom.palette.marketStatus.extended.main,
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
  baseTime: Date | null;
  market: Market;
}

export const TimelineItemHeader: React.FunctionComponent<Props> = (props) => {
  const { baseTime, market } = props;
  const status = useMarketStatus(market, true, baseTime);
  const nextEvent = useMarketNextEvent(market, true);

  const classes = useStyles(props);
  const marketStatusClass = defineMarketStatusClass(status, classes);

  return (
    <Box>
      <Box className={`${classes.timelineHeaderWrapper} ${marketStatusClass}`}>
        <Box className={classes.componentTitle}>
          <MarketTitle name={market.name} status={status} />
        </Box>
        <Box className={classes.componentClock}>
          {baseTime && (
            <Clock
              time={baseTime}
              timezone={market.timezone}
              displayTimezone
              displayDayDiff
            />
          )}
          {!baseTime && (
            <RealTimeClock
              timezone={market.timezone}
              displayTimezone
              displayDayDiff
            />
          )}
        </Box>
        <Box className={classes.componentNextEvent}>
          {nextEvent && !baseTime && <MarketNextEvent nextEvent={nextEvent} />}
        </Box>
      </Box>
      <FluidText
        {...mainFluidText}
        className={classes.timelineHeaderPlaceholder}
      >
        {"\u00A0"}
      </FluidText>
    </Box>
  );
};
