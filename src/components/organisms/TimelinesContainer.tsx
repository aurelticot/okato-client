import React, { useCallback } from "react";
import {
  Box,
  Fab,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Refresh as ResyncIcon } from "@mui/icons-material";
import { DateTime } from "luxon";
import { Market } from "lib/types";
import {
  getTimelineSizeInHours,
  getTimelineSizeInSeconds,
  getTimelineVisibleSizeInHours,
} from "lib/utils";
import { useBaseTime, useWindowSize } from "lib/hooks";
import { TimelinesList } from "components/organisms";
import { useIntl } from "react-intl";

const timelineSizeInHours = getTimelineSizeInHours();
const timelineTotalSizeInSeconds = getTimelineSizeInSeconds();
const timelineVisibleSizeInHours = getTimelineVisibleSizeInHours();

interface Props {
  markets: Market[] | null;
  nbMarketsLoading: number;
}

export const TimelinesContainer: React.FunctionComponent<Props> = ({
  markets,
  nbMarketsLoading,
}) => {
  const [baseTime, setBaseTime] = useBaseTime();

  const { width } = useWindowSize();
  const resizing = React.useRef(false);
  const adjusting = React.useRef(false);
  const scrollBasetimeAdjustmentTimer = React.useRef<NodeJS.Timeout>();
  const containerRef = React.useRef<HTMLDivElement>();

  const handleScroll = React.useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement || resizing.current || adjusting.current) {
      return;
    }
    const timelineSize = containerElement.scrollWidth;
    const middleTimelineViewport = containerElement.clientWidth / 2;
    const middleTimeline = timelineSize / 2;
    const timeDiff =
      containerElement.scrollLeft - middleTimeline + middleTimelineViewport;
    const timeDiffInSec =
      (timeDiff * timelineTotalSizeInSeconds) / timelineSize;
    if (Math.abs(timeDiffInSec) < 60) {
      return;
    }
    const now = DateTime.local();
    const targetTime = now.plus({ seconds: timeDiffInSec });
    setBaseTime(targetTime.toJSDate());
  }, [setBaseTime]);

  const handleBackToRealTime = React.useCallback(() => {
    setBaseTime(null);
  }, [setBaseTime]);

  const initialScroll = React.useRef(true);

  const resfreshPosition = useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement) {
      return;
    }
    const timelineSize = containerElement.scrollWidth;
    const middleContainerViewport = containerElement.clientWidth / 2;
    const middleTimeline = timelineSize / 2;
    let timeDiff = 0;
    if (baseTime) {
      const now = DateTime.fromJSDate(new Date());
      const targetTime = DateTime.fromJSDate(baseTime);
      const timeDiffInSec = targetTime.diff(now).as("seconds");
      timeDiff = (timeDiffInSec * timelineSize) / timelineTotalSizeInSeconds;
    }
    containerElement.scrollLeft =
      middleTimeline + timeDiff - middleContainerViewport;
  }, [baseTime]);

  React.useLayoutEffect(() => {
    if (!initialScroll.current && baseTime) {
      return;
    }
    initialScroll.current = false;
    resfreshPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseTime]);

  React.useLayoutEffect(() => {
    if (baseTime) {
      scrollBasetimeAdjustmentTimer.current = setInterval(() => {
        adjusting.current = true;
        resfreshPosition();
        setTimeout(() => {
          adjusting.current = false;
        }, 500);
      }, 10000);
    } else if (scrollBasetimeAdjustmentTimer.current) {
      clearInterval(scrollBasetimeAdjustmentTimer.current);
    }
    return () => {
      if (scrollBasetimeAdjustmentTimer.current) {
        clearInterval(scrollBasetimeAdjustmentTimer.current);
      }
    };
  }, [baseTime, resfreshPosition]);

  React.useLayoutEffect(() => {
    resizing.current = true;
    resfreshPosition();
    const timer = setTimeout(() => {
      resizing.current = false;
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));

  const i18n = useIntl();

  const resyncRealtimeButtonLabel = i18n.formatMessage({
    id: "TimelinesContainer.ResyncFABLabel",
    description: "Label of the button to resync real-time the timelines",
    defaultMessage: "Real-time",
  });

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: (theme) => theme.spacing(1),
          position: "absolute",
          minHeight: "100%",
          zIndex: 100,
          top: "0",
          left: "0",
          background: (theme) =>
            `linear-gradient(270deg, ${theme.palette.background.default}00 0%, ${theme.palette.background.default} 100%)`,
        }}
      />
      <Box
        sx={{
          width: (theme) => theme.spacing(1),
          position: "absolute",
          minHeight: "100%",
          zIndex: 100,
          top: "0",
          right: "0",
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.background.default}00 0%, ${theme.palette.background.default} 100%)`,
        }}
      />
      <Box
        sx={{
          width: "100%",
          overflow: "auto",
        }}
        onScroll={handleScroll}
        {...{ ref: containerRef }}
      >
        <Box
          sx={{
            width: `${
              (timelineSizeInHours * 100) / timelineVisibleSizeInHours
            }%`,
          }}
        >
          <TimelinesList
            markets={markets}
            baseTime={baseTime}
            nbMarketsLoading={nbMarketsLoading}
          />
        </Box>
      </Box>
      <Slide direction="left" in={!!baseTime} mountOnEnter unmountOnExit>
        <Fab
          color="primary"
          variant={upMd ? "extended" : "circular"}
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(3),
            zIndex: 100,
          }}
          onClick={handleBackToRealTime}
        >
          <ResyncIcon />
          {upMd && (
            <Typography
              sx={{
                ml: 1,
              }}
            >
              {resyncRealtimeButtonLabel}
            </Typography>
          )}
        </Fab>
      </Slide>
    </Box>
  );
};
