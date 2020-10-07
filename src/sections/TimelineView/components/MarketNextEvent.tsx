import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { DateTime, Interval } from "luxon";
import { useIntl } from "react-intl";
import { MarketSession } from "../../../lib/types";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.8em",
    color: theme.palette.text.secondary,
  },
}));

const useRelativeTime = (tagetDate: DateTime): string | null => {
  const [relativeTime, setRelativeTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = DateTime.local();
      if (now > tagetDate) {
        setRelativeTime(null);
      } else {
        const interval = Interval.fromDateTimes(now, tagetDate);
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
  const { mainStatus, startTime, date } = nextEvent;
  const classes = useStyles();
  const i18n = useIntl();

  const startTimeObject = DateTime.fromISO(`${date}T${startTime}`);
  const relativeTime = useRelativeTime(startTimeObject);

  if ((!startTime && !mainStatus) || relativeTime === null) {
    return null;
  }
  const status = mainStatus;
  return (
    <Box className={classes.root}>
      {i18n.formatMessage(
        {
          id: "NextMarketEvent",
          description: "next market event",
          defaultMessage:
            "{status, select, OPEN {Open} CLOSE {Close}} in {relativeTime}",
        },
        { status, relativeTime }
      )}
    </Box>
  );
};
