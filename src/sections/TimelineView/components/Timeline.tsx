import React, { useState, useCallback, useEffect } from "react";
import { DateTime } from "luxon";
import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MarketSession,
  MarketStatus,
  TimelineSegment,
} from "../../../lib/types";
import {
  getTimelineSizeInMinutes,
  resolveTimelineSegments,
} from "../../../lib/utils";
import { useFrequency } from "../../../lib/hooks";

const timelineSize = getTimelineSizeInMinutes();

const useStyles = makeStyles((theme) => ({
  root: {
    height: `clamp(3rem, 8vmin, 8rem)`,
  },
  timelineWrapper: {
    position: "relative",
    height: "100%",
  },
  timeMarker: {
    width: "2px",
    opacity: "100%",
    backgroundColor: theme.palette.grey[400],
    boxShadow: theme.shadows[3],
  },
  baseTimeMarker: {
    position: "absolute",
    left: "calc(50% - 1px)",
    zIndex: 10,
    height: `clamp(3rem, 8vmin, 8rem)`,
  },
  nowTimeMarker: {
    position: "absolute",
    left: "calc(50% - 1px)",
    zIndex: 10,
  },
  timeline: {
    display: "flex",
    height: "100%",
    boxShadow: theme.shadows[3],
  },
  segment: {},
}));

const useMarketStatusStyles = makeStyles((theme) => ({
  open: {
    background: theme.palette.success.main,
    opacity: "100%",
  },
  break: {
    background: theme.palette.warning.light,
    opacity: "70%",
    backgroundImage:
      "repeating-linear-gradient(80deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  close: {
    background: theme.palette.error.light,
    opacity: "15%",
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  closeSpecial: {
    background: theme.palette.error.light,
    opacity: "40%",
  },
  beforeMarket: {
    background: theme.palette.warning.light,
    opacity: "60%",
    backgroundImage:
      "repeating-linear-gradient(-75deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  afterMarket: {
    background: theme.palette.warning.light,
    opacity: "60%",
    backgroundImage:
      "repeating-linear-gradient(-75deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
}));

const useSegments = (
  sessions: MarketSession[],
  timezone: string
): TimelineSegment[] => {
  const time = useFrequency(10000);
  const now = DateTime.local().setZone(timezone);
  const initialSegments: TimelineSegment[] = resolveTimelineSegments(
    now,
    timezone,
    sessions
  );
  const [segments, setSegments] = useState<TimelineSegment[]>(initialSegments);

  const updateSegments = useCallback(() => {
    const newNow = DateTime.local().setZone(timezone);
    const newSegments: TimelineSegment[] = resolveTimelineSegments(
      newNow,
      timezone,
      sessions
    );
    setSegments(newSegments);
  }, [sessions, timezone]);

  useEffect(() => {
    updateSegments();
  }, [updateSegments, time]);
  return segments;
};

const defineSegmentClass = (
  status: MarketStatus,
  classes: Record<string, string>
): string => {
  switch (status) {
    case MarketStatus.OPEN:
      return classes.open;
    case MarketStatus.BREAK:
      return classes.break;
    case MarketStatus.CLOSE:
      return classes.close;
    case MarketStatus.CLOSE_SPECIAL:
      return classes.closeSpecial;
    case MarketStatus.BEFORE_MARKET:
      return classes.beforeMarket;
    case MarketStatus.AFTER_MARKET:
      return classes.afterMarket;
    default:
      return classes.close;
  }
};

interface Props {
  sessions: MarketSession[];
  timezone: string;
  displayNowTimeMarker?: boolean;
  displayBaseTimeMarker?: boolean;
}

export const Timeline = (props: Props) => {
  const {
    sessions,
    timezone,
    displayNowTimeMarker = true,
    displayBaseTimeMarker = true,
  } = props;

  const segments = useSegments(sessions, timezone);

  const classes = useStyles();
  const marketStatusClasses = useMarketStatusStyles();

  const timelineSegments = segments.map((segment, index) => {
    const { start, duration, status } = segment;
    const segmentClass = defineSegmentClass(status, marketStatusClasses);
    return (
      <Box
        className={`${classes.segment} ${segmentClass}`}
        style={{
          width: `${(duration * 100) / timelineSize}%`,
          left: `${(start * 100) / timelineSize}%`,
        }}
        key={index}
      />
    );
  });

  return (
    <Box className={classes.root}>
      {displayBaseTimeMarker && (
        <Divider
          orientation="vertical"
          className={`${classes.timeMarker} ${classes.baseTimeMarker}`}
        />
      )}
      <Box className={classes.timelineWrapper}>
        {displayNowTimeMarker && (
          <Divider
            orientation="vertical"
            className={`${classes.timeMarker} ${classes.nowTimeMarker}`}
          />
        )}
        <Box className={classes.timeline}>
          {timelineSegments.length > 0 ? (
            timelineSegments
          ) : (
            <Box
              className={`${classes.segment} ${marketStatusClasses.close}`}
              style={{ width: "100%" }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
