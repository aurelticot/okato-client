import React from "react";
import { makeStyles } from "@mui/styles/";
import { DateTime, Interval } from "luxon";
import { useIntl } from "react-intl";
import { MarketSession } from "lib/types";
import { getFluidTextValues } from "lib/utils";
import { FluidText } from "components/atoms";

const mainFluidText = getFluidTextValues(0.8);

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}));

const getRelativeTime = (
  targetTime: DateTime,
  baseTime?: DateTime
): string | null => {
  const time = baseTime || DateTime.local();
  if (time > targetTime) {
    return null;
  } else {
    const interval = Interval.fromDateTimes(time, targetTime);
    const hourCount = interval.length("hours");
    if (hourCount > 1) {
      return `${Math.floor(hourCount)}h`;
    } else {
      const minuteCount = interval.length("minutes");
      return `${Math.floor(minuteCount + 1)}m`;
    }
  }
};

interface Props {
  nextEvent: MarketSession;
}

export const MarketNextEvent: React.FunctionComponent<Props> = ({
  nextEvent,
}) => {
  const { mainStatus, start } = nextEvent;
  const classes = useStyles();
  const i18n = useIntl();

  const relativeTime = getRelativeTime(start);

  if ((!start && !mainStatus) || relativeTime === null) {
    return null;
  }
  const status = mainStatus;
  return (
    <FluidText {...mainFluidText} className={classes.root}>
      {i18n.formatMessage(
        {
          id: "NextMarketEvent",
          description: "next market event",
          defaultMessage:
            "{status, select, OPEN {Open} CLOSE {Close}} in {relativeTime}",
        },
        { status, relativeTime }
      )}
    </FluidText>
  );
};
