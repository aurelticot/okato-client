import React from "react";
import { Badge, Box, Tooltip } from "@mui/material";
import { AppDate, Clock, RealTimeClock } from "components/molecules";
import { useIntl } from "react-intl";

interface Props {
  baseTime: Date | null;
}

export const TimelineRulerTime: React.FunctionComponent<Props> = (props) => {
  const { baseTime } = props;
  const i18n = useIntl();

  const backToRealtimeTooltipMessage = i18n.formatMessage({
    id: "TimelineTime.backToRealtimeTooltip",
    defaultMessage: "Click to come back to real-time",
    description: "Tooltip message on the button to come back to real time",
  });
  const displayingRealtimeTooltipMessage = i18n.formatMessage({
    id: "TimelineTime.displayingRealtimeTooltip",
    defaultMessage: "Displaying real-time",
    description: "Tooltip message on the time displaying in realtime",
  });

  const realtimeTooltip = baseTime
    ? backToRealtimeTooltipMessage
    : displayingRealtimeTooltipMessage;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          width: (theme) => theme.custom.mixins.fluidLength(1.5),
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.background.default}00 0%, ${theme.palette.background.default} 100%)`,
        }}
      />
      <Tooltip
        title={realtimeTooltip}
        aria-label={realtimeTooltip}
        arrow
        placement="top"
        disableFocusListener
      >
        <Box
          sx={{
            backgroundColor: "background.default",
            paddingRight: (theme) => theme.custom.mixins.fluidLength(0.75),
            paddingLeft: (theme) => theme.custom.mixins.fluidLength(0.75),
            pb: 0.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AppDate time={baseTime} />
          {baseTime ? (
            <Badge
              color="primary"
              variant="dot"
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Clock time={baseTime} />
            </Badge>
          ) : (
            <RealTimeClock />
          )}
        </Box>
      </Tooltip>
      <Box
        sx={{
          width: (theme) => theme.custom.mixins.fluidLength(1.5),
          background: (theme) =>
            `linear-gradient(270deg, ${theme.palette.background.default}00 0%, ${theme.palette.background.default} 100%)`,
        }}
      />
    </Box>
  );
};
