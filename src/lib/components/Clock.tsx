import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import { Box } from "@material-ui/core";
import { FluidText } from "./FluidText";
import { getFluidTextValues } from "lib/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "baseline",
    whiteSpace: "nowrap",
  },
  timePrefix: {
    flex: "1",
    display: "flex",
    justifyContent: "flex-end",
  },
  timeSuffix: {
    flex: "1",
    display: "flex",
    justifyContent: "flex-start",
  },
  time: {
    display: "flex",
    justifyContent: "center",
  },
  timezone: {
    marginLeft: theme.custom.mixins.fluidLength(0.2),
    textTransform: "uppercase",
  },
  dayDiff: {
    textTransform: "uppercase",
    marginRight: theme.custom.mixins.fluidLength(0.2),
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
      <Box className={classes.timePrefix}>
        {displayDayDiff && displayedDayDiff && (
          <FluidText {...subFluidText} className={classes.dayDiff}>
            {displayedDayDiff}
          </FluidText>
        )}
      </Box>
      <Box className={classes.time}>
        <FluidText {...mainFluidText}>{workingTime.toFormat("HH")}</FluidText>
        <FluidText {...mainFluidText}>:</FluidText>
        <FluidText {...mainFluidText}>{workingTime.toFormat("mm")}</FluidText>
      </Box>
      <Box className={classes.timeSuffix}>
        {displaySeconds && <FluidText {...mainFluidText}>:</FluidText>}
        {displaySeconds && (
          <FluidText {...mainFluidText}>{workingTime.toFormat("ss")}</FluidText>
        )}
        {displayTimezone && (
          <FluidText
            {...subFluidText}
            className={classes.timezone}
          >{`GMT${workingTime.toFormat("Z")}`}</FluidText>
        )}
      </Box>
    </Box>
  );
};
