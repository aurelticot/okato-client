import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tooltip } from "@material-ui/core";
import { Refresh as RefreshIcon } from "@material-ui/icons";
import {
  AppDate,
  Clock,
  RealTimeClock,
  FluidText,
} from "../../../../../../../../../../lib/components";
import { useIntl } from "react-intl";
import { getFluidTextValues } from "../../../../../../../../../../lib/utils";

const refreshIconPlaceholderFluidText = getFluidTextValues(0.8);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "stretch",
  },
  timeContainer: {
    backgroundColor: theme.palette.background.default,
    paddingRight: theme.custom.fluidLength(0.75),
    paddingLeft: theme.custom.fluidLength(0.75),
    position: "relative",
  },
  timeContainerButton: {
    cursor: "pointer",
  },
  timeWrapper: {
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
    width: theme.custom.fluidLength(1.5),
  },
  shadowBorderLeft: {
    background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 100%)`,
  },
  shadowBorderRight: {
    background: `linear-gradient(270deg, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 100%)`,
  },
}));

interface Props {
  time: Date | null;
  onClickBackToRealTime: () => void;
}

export const TimelineTime: React.FunctionComponent<Props> = (props) => {
  const { time, onClickBackToRealTime } = props;
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

  const realtimeTooltip = time
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
        <Box
          className={`${classes.timeContainer} ${
            time ? classes.timeContainerButton : ""
          }`}
          onClick={onClickBackToRealTime}
        >
          <Box className={classes.timeWrapper}>
            <FluidText
              {...refreshIconPlaceholderFluidText}
              className={classes.refreshIconWrapper}
            >
              {time ? (
                <RefreshIcon className={classes.refreshIcon} />
              ) : (
                "\u00A0"
              )}
            </FluidText>
            <AppDate time={time} />
            {time ? <Clock time={time} /> : <RealTimeClock />}
          </Box>
        </Box>
      </Tooltip>
      <Box className={`${classes.shadowBorder} ${classes.shadowBorderRight}`} />
    </Box>
  );
};
