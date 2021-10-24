import React from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@mui/styles";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Market, MarketStatus } from "lib/types";
import { FluidTypography } from "components/atoms";
import {
  Clock,
  RealTimeClock,
  MarketTitle,
  MarketNextEvent,
} from "components/molecules";
import {
  getFluidTextValues,
  getMarketNextEvent,
  getMarketStatus,
} from "lib/utils";

const mainFluidText = getFluidTextValues(1);

const useStyles = makeStyles((theme) => ({
  marketOpen: {
    color: theme.custom.palette.marketStatus.open.text,
  },
  marketClosed: {
    color: theme.custom.palette.marketStatus.close.text,
  },
  marketAfterBeforeHour: {
    color: theme.custom.palette.marketStatus.other.text,
  },
}));

const defineMarketStatusClass = (
  status: MarketStatus,
  classes: Record<string, string>
): string => {
  switch (status) {
    case MarketStatus.OPEN:
      return classes.marketOpen;
    case MarketStatus.CLOSE:
    case MarketStatus.CLOSE_SPECIAL:
      return classes.marketClosed;
    case MarketStatus.BREAK:
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
  const status = getMarketStatus(
    baseTime ? DateTime.fromJSDate(baseTime) : DateTime.local(),
    market,
    false
  );
  const nextEvent = getMarketNextEvent(
    baseTime ? DateTime.fromJSDate(baseTime) : DateTime.local(),
    market,
    true
  );
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down("md"));

  const marketTitle = `${market.shortName}${downSM ? "" : ` - ${market.name}`}`;

  const classes = useStyles(props);
  const marketStatusClass = defineMarketStatusClass(status, classes);
  return (
    <Box component="header">
      <Box
        sx={{
          width: "100%",
          px: 1,
          py: 0,
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
        className={marketStatusClass}
      >
        <Box
          sx={{
            flexBasis: "25%",
            maxWidth: "25%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <MarketTitle name={marketTitle} status={status} />
        </Box>
        <Box
          sx={{
            flexBasis: "50%",
            maxWidth: "50%",
          }}
        >
          {baseTime && (
            <Clock
              time={baseTime}
              timezone={market.timezone}
              displayTimezone
              displayDayDiff
              displayDayPeriod
            />
          )}
          {!baseTime && (
            <RealTimeClock
              timezone={market.timezone}
              displayTimezone
              displayDayDiff
              displayDayPeriod
            />
          )}
        </Box>
        <Box
          sx={{
            flexBasis: "25%",
            maxWidth: "25%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {nextEvent && !baseTime && <MarketNextEvent nextEvent={nextEvent} />}
        </Box>
      </Box>
      <FluidTypography
        {...mainFluidText}
        sx={{
          visibility: "hidden",
        }}
      >
        {"\u00A0"}
      </FluidTypography>
    </Box>
  );
};
