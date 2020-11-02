import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { DateTime, Interval } from "luxon";
import { useIntl } from "react-intl";
import { MarketSession } from "../../../lib/types";
import { oneMinuteInMillis } from "../../../lib/constants";
import { useFrequency } from "../../../lib/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.8em",
    color: theme.palette.text.secondary,
  },
}));

const useRelativeTime = (targetDate: DateTime): string | null => {
  const time = useFrequency(oneMinuteInMillis);
  const [relativeTime, setRelativeTime] = useState<string | null>(null);

  useEffect(() => {
    const now = DateTime.local();
    if (now > targetDate) {
      setRelativeTime(null);
    } else {
      const interval = Interval.fromDateTimes(now, targetDate);
      const hourCount = interval.length("hour");
      if (hourCount > 1) {
        setRelativeTime(`${Math.floor(hourCount)}h`);
      } else {
        const minuteCount = interval.length("minute");
        setRelativeTime(`${Math.floor(minuteCount + 1)}m`);
      }
    }
  }, [time, targetDate]);

  return relativeTime;
};

interface Props {
  nextEvent: MarketSession;
}

export const MarketNextEvent = ({ nextEvent }: Props) => {
  const { mainStatus, start } = nextEvent;
  const classes = useStyles();
  const i18n = useIntl();

  const startTimeObject = DateTime.fromJSDate(start);
  const relativeTime = useRelativeTime(startTimeObject);

  if ((!start && !mainStatus) || relativeTime === null) {
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
