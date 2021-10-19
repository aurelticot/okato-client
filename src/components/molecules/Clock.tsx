import React from "react";
import { DateTime } from "luxon";
import { Box } from "@mui/material";
import { FluidTypography } from "components/atoms";
import { getFluidTextValues } from "lib/utils";

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
  const { time, timezone, displayTimezone, displayDayDiff, displaySeconds } =
    props;

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

  return (
    <Box
      component="time"
      dateTime={workingTime.toISO()}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "baseline",
        whiteSpace: "nowrap",
      }}
    >
      <Box sx={{ flex: "1", display: "flex", justifyContent: "flex-end" }}>
        {displayDayDiff && displayedDayDiff && (
          <FluidTypography
            {...subFluidText}
            sx={{
              textTransform: "uppercase",
              mr: (theme) => theme.custom.mixins.fluidLength(0.2),
            }}
          >
            {displayedDayDiff}
          </FluidTypography>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FluidTypography {...mainFluidText}>
          {workingTime.toFormat("HH")}
        </FluidTypography>
        <FluidTypography {...mainFluidText}>:</FluidTypography>
        <FluidTypography {...mainFluidText}>
          {workingTime.toFormat("mm")}
        </FluidTypography>
      </Box>
      <Box sx={{ flex: "1", display: "flex", justifyContent: "flex-start" }}>
        {displaySeconds && (
          <FluidTypography {...mainFluidText}>:</FluidTypography>
        )}
        {displaySeconds && (
          <FluidTypography {...mainFluidText}>
            {workingTime.toFormat("ss")}
          </FluidTypography>
        )}
        {displayTimezone && (
          <FluidTypography
            {...subFluidText}
            sx={{
              textTransform: "uppercase",
              ml: (theme) => theme.custom.mixins.fluidLength(0.2),
            }}
          >{`GMT${workingTime.toFormat("Z")}`}</FluidTypography>
        )}
      </Box>
    </Box>
  );
};
