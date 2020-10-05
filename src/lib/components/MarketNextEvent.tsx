import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { DateTime, Interval } from "luxon";
import { useIntl } from "react-intl";
import { MarketSession } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.8em",
    color: theme.palette.text.secondary,
  },
}));

const useRelativeTime = (time: Date): string | null => {
  const [relativeTime, setRelativeTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = DateTime.local();
      const later = DateTime.fromJSDate(time);
      if (now > later) {
        setRelativeTime(null);
      } else {
        const interval = Interval.fromDateTimes(now, later);
        const hourCount = interval.length("hour");
        if (hourCount > 1) {
          setRelativeTime(`${Math.floor(hourCount)}h`);
        } else {
          const minuteCount = interval.length("minute");
          setRelativeTime(`${Math.floor(minuteCount + 1)}m`);
        }
      }
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  });

  return relativeTime;
};

interface Props {
  nextEvent: MarketSession;
}

export const MarketNextEvent = ({ nextEvent }: Props) => {
  const { status, startTime } = nextEvent;
  const classes = useStyles();
  const i18n = useIntl();

  const relativeTime = useRelativeTime(startTime);

  if ((!startTime && !status) || relativeTime === null) {
    return null;
  }

  return (
    <Box className={classes.root}>
      {i18n.formatMessage(
        {
          id: "NextMarketEvent",
          description: "next market event",
          defaultMessage:
            "{status, select, open {Open} break {Open} close {Close} close_special {Close} before_market {Close} after_market {Close} } in {relativeTime}",
        },
        { status, relativeTime }
      )}
    </Box>
  );
};
