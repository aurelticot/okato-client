import React, { useCallback } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import { config } from "config";
import { Market } from "lib/types";
import { getTimelineSizeInHours, getTimelineSizeInSeconds } from "lib/utils";
import { useBaseTime, useWindowSize } from "lib/hooks";
import { TimelinesList } from "./components";

const { timelineVisiblePeriod } = config;

const timelineTotalhours = getTimelineSizeInHours();
const timelineTotalSizeInSeconds = getTimelineSizeInSeconds();

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  shadowBorder: {
    width: theme.spacing(1),
    position: "absolute",
    minHeight: "100%",
    zIndex: 100,
  },
  shadowBorderLeft: {
    top: "0",
    left: "0",
    background: `linear-gradient(270deg, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 100%)`,
  },
  shadowBorderRight: {
    top: "0",
    right: "0",
    background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 100%)`,
  },
  container: {
    width: "100%",
    overflow: "auto",
  },
  innerContainer: {
    width: `${(timelineTotalhours * 100) / timelineVisiblePeriod}%`,
  },
}));

interface Props {
  markets: Market[];
}

export const TimelinesContainer: React.FunctionComponent<Props> = ({
  markets,
}) => {
  const [baseTime, setBaseTime] = useBaseTime();

  const { width } = useWindowSize();
  const resizing = React.useRef(false);

  const containerRef = React.useRef<HTMLDivElement>();

  const handleScroll = React.useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement || resizing.current) {
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
    resizing.current = true;
    resfreshPosition();
    const timer = setTimeout(() => {
      resizing.current = false;
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={`${classes.shadowBorder} ${classes.shadowBorderLeft}`} />
      <Box className={`${classes.shadowBorder} ${classes.shadowBorderRight}`} />
      <Box
        className={classes.container}
        onScroll={handleScroll}
        {...{ ref: containerRef }}
      >
        <Box className={classes.innerContainer}>
          <TimelinesList
            markets={markets}
            baseTime={baseTime}
            onClickBackToRealTime={handleBackToRealTime}
          />
        </Box>
      </Box>
    </Box>
  );
};
