import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import { Box } from "@material-ui/core";
import { FluidText } from "./FluidText";
import { getFluidTextValues } from "../utils";

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
    textTransform: "uppercase",
    position: "absolute",
    bottom: "3px",
    left: "4.5em",
    width: "4em",
  },
  dayDiff: {
    position: "absolute",
    bottom: "3px",
    right: "4.4em",
    width: "1em",
  },
}));

const mainFluidText = getFluidTextValues(1);
const subFluidText = getFluidTextValues(0.6);

interface Props {
  time: Date;
  timezone?: string;
  displayTimezone?: boolean;
  displayDayDiff?: boolean;
  displaySeconds?: boolean;
}

export const Clock: React.FunctionComponent<Props> = (props) => {
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
        <FluidText {...subFluidText} className={classes.dayDiff}>
          {displayedDayDiff}
        </FluidText>
      )}
      <Box className={classes.time}>
        <FluidText {...mainFluidText}>{workingTime.toFormat("HH")}</FluidText>
        <FluidText {...mainFluidText}>:</FluidText>
        <FluidText {...mainFluidText}>{workingTime.toFormat("mm")}</FluidText>
        {displaySeconds && <FluidText {...mainFluidText}>:</FluidText>}
        {displaySeconds && (
          <FluidText {...mainFluidText}>{workingTime.toFormat("ss")}</FluidText>
        )}
      </Box>
      {displayTimezone && (
        <FluidText
          {...subFluidText}
          className={classes.timezone}
        >{`GMT${workingTime.toFormat("Z")}`}</FluidText>
      )}
    </Box>
  );
};
