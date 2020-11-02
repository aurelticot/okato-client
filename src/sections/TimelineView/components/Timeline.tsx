import React, { useState, useCallback, useEffect } from "react";
import { DateTime } from "luxon";
import { Box, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MarketSession,
  MarketStatus,
  TimelineSegment,
} from "../../../lib/types";
import { getTimelineSize, resolveTimelineSegments } from "../../../lib/utils";
import { useFrequency } from "../../../lib/hooks";

const useStyles = makeStyles((_theme) => ({
  root: {
    position: "relative",
  },
  segment: {
    height: "3em",
  },
  timeMarkerContainer: {
    position: "absolute",
    width: "100%",
    bottom: "-0.2em",
    display: "flex",
    justifyContent: "center",
  },
  timeMarker: {
    height: "3.4em",
    zIndex: 10,
    width: "3px",
    opacity: "100%",
  },
  timeline: {
    display: "flex",
  },
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
      "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
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

const timelineSize = getTimelineSize();

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

interface Props {
  sessions: MarketSession[];
  timezone: string;
  displayTimeMarker?: boolean;
}

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

export const Timeline = (props: Props) => {
  const { sessions, timezone, displayTimeMarker } = props;

  const segments = useSegments(sessions, timezone);

  const classes = useStyles();
  const marketStatusClasses = useMarketStatusStyles();

  const timelineSegments = segments.map((segment, index) => {
    const { status, duration } = segment;
    const segmentClass = defineSegmentClass(status, marketStatusClasses);
    return (
      <Paper
        square
        className={`${classes.segment} ${segmentClass}`}
        style={{ width: `${(duration * 100) / timelineSize}%` }}
        key={index}
      />
    );
  });

  return (
    <Box className={classes.root}>
      {displayTimeMarker && (
        <Box className={classes.timeMarkerContainer}>
          <Divider orientation="vertical" className={classes.timeMarker} />
        </Box>
      )}
      <Box className={classes.timeline}>
        {timelineSegments.length > 0 ? (
          timelineSegments
        ) : (
          <Paper
            square
            className={`${classes.segment} ${marketStatusClasses.close}`}
            style={{ width: "100%" }}
          />
        )}
      </Box>
    </Box>
  );
};
