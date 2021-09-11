import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, Box, Tooltip } from "@material-ui/core";
import { AppDate, Clock, RealTimeClock } from "components/molecules";
import { useIntl } from "react-intl";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "stretch",
  },
  timeContainer: {
    backgroundColor: theme.palette.background.default,
    paddingRight: theme.custom.mixins.fluidLength(0.75),
    paddingLeft: theme.custom.mixins.fluidLength(0.75),
    paddingBottom: theme.spacing(0.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  refreshIconWrapper: {
    height: "1.875em",
    lineHeight: "1.875",
  },
  refreshIcon: {
    fontSize: "inherit",
  },
  shadowBorder: {
    width: theme.custom.mixins.fluidLength(1.5),
  },
  shadowBorderLeft: {
    background: `linear-gradient(90deg, ${theme.palette.background.default}00 0%, ${theme.palette.background.default} 100%)`,
  },
  shadowBorderRight: {
    background: `linear-gradient(270deg, ${theme.palette.background.default}00 0%, ${theme.palette.background.default} 100%)`,
  },
}));

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

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={`${classes.shadowBorder} ${classes.shadowBorderLeft}`} />
      <Tooltip
        title={realtimeTooltip}
        aria-label={realtimeTooltip}
        arrow
        interactive
        placement="top"
        disableFocusListener
      >
        <Box className={classes.timeContainer}>
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
      <Box className={`${classes.shadowBorder} ${classes.shadowBorderRight}`} />
    </Box>
  );
};
