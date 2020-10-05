import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((_theme) => ({
  root: {
    position: "relative",
  },
  time: {
    width: "3em",
    display: "flex",
    justifyContent: "center",
  },
  timezone: {
    fontSize: "0.6em",
    position: "absolute",
    bottom: "3px",
    left: "5em",
    width: "4em",
  },
  dayDiff: {
    fontSize: "0.6em",
    position: "absolute",
    bottom: "3px",
    right: "4.7em",
    width: "1em",
  },
}));

interface Props {
  time: Date;
  timezone?: string;
  displayTimezone?: boolean;
  displayDayDiff?: boolean;
  displaySeconds?: boolean;
}

export const Clock = (props: Props) => {
  const {
    time,
    timezone,
    displayTimezone,
    displayDayDiff,
    displaySeconds,
  } = props;

  const workingTime = DateTime.fromJSDate(time, { zone: timezone || "local" });
  const localTime = DateTime.fromJSDate(time, { zone: "local" });

  const normalizedTime = DateTime.local(
    workingTime.year,
    workingTime.month,
    workingTime.day
  );
  let displayedDayDiff = null;
  if (normalizedTime < localTime.startOf("day")) {
    displayedDayDiff = "-1";
  } else if (normalizedTime > localTime.startOf("day")) {
    displayedDayDiff = "+1";
  }

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {displayDayDiff && displayedDayDiff && (
        <Box className={classes.dayDiff}>{displayedDayDiff}</Box>
      )}
      <Box className={classes.time}>
        <Box>{workingTime.toFormat("HH")}</Box>
        <Box>:</Box>
        <Box>{workingTime.toFormat("mm")}</Box>
        {displaySeconds && <Box>:</Box>}
        {displaySeconds && <Box>{workingTime.toFormat("ss")}</Box>}
      </Box>
      {displayTimezone && (
        <Box className={classes.timezone}>{`GMT${workingTime.toFormat(
          "Z"
        )}`}</Box>
      )}
    </Box>
  );
};
