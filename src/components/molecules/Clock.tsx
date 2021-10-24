import React from "react";
import { DateTime } from "luxon";
import { Box } from "@mui/material";
import { useIntl } from "react-intl";
import { FluidTypography } from "components/atoms";
import { getFluidTextValues } from "lib/utils";
import { useUserSetting } from "lib/hooks";
import { SettingKey, TimeFormat } from "lib/types";

const mainFluidText = getFluidTextValues(1);
const subFluidText = getFluidTextValues(0.6);

export interface ClockProps {
  time: Date;
  timezone?: string;
  displayTimezone?: boolean;
  displayDayDiff?: boolean;
  displaySeconds?: boolean;
  displayDayPeriod?: boolean;
}

export const Clock: React.FunctionComponent<ClockProps> = (props) => {
  const {
    time,
    timezone,
    displayTimezone,
    displayDayDiff,
    displaySeconds,
    displayDayPeriod,
  } = props;
  const i18n = useIntl();
  const [timeFormat] = useUserSetting<TimeFormat>(SettingKey.TimeFormat);

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

  const timeParts = workingTime.setLocale(i18n.locale).toLocaleParts({
    hour: "2-digit",
    minute: "2-digit",
    hour12:
      timeFormat === TimeFormat.System
        ? undefined
        : timeFormat === TimeFormat.Hour12
        ? true
        : false,
  });
  const formattedHours = timeParts.find((part) => part.type === "hour");
  const formattedMinutes = timeParts.find((part) => part.type === "minute");
  const formattedSeconds = timeParts.find((part) => part.type === "second");
  const formattedDayPeriod = timeParts.find(
    (part) => part.type === "dayPeriod"
  );

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
          {formattedHours?.value}
        </FluidTypography>
        <FluidTypography {...mainFluidText}>:</FluidTypography>
        <FluidTypography {...mainFluidText}>
          {formattedMinutes?.value}
        </FluidTypography>
      </Box>
      <Box sx={{ flex: "1", display: "flex", justifyContent: "flex-start" }}>
        {displaySeconds && (
          <>
            <FluidTypography {...mainFluidText}>:</FluidTypography>
            <FluidTypography {...mainFluidText}>
              {formattedSeconds?.value}
            </FluidTypography>
          </>
        )}
        {displayDayPeriod && formattedDayPeriod && (
          <FluidTypography
            {...subFluidText}
            sx={{
              textTransform: "lowercase",
              ml: (theme) => theme.custom.mixins.fluidLength(0.2),
            }}
          >
            {formattedDayPeriod.value}
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
