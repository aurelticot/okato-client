import React, { useState, useCallback, useEffect } from "react";
import { DateTime } from "luxon";
import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MarketSession,
  TimelineSegment as TimelineSegmentType,
} from "../../../../../../../../../../lib/types";
import {
  getTimelineSizeInMinutes,
  resolveTimelineSegments,
} from "../../../../../../../../../../lib/utils";
import { useFrequency } from "../../../../../../../../../../lib/hooks";
import { TimelineSegment, TimelineSegmentDefault } from "./components";

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
}));

const useSegments = (
  sessions: MarketSession[],
  timezone: string
): TimelineSegmentType[] => {
  const time = useFrequency(10000);
  const now = DateTime.local().setZone(timezone);
  const initialSegments: TimelineSegmentType[] = resolveTimelineSegments(
    now,
    timezone,
    sessions
  );
  const [segments, setSegments] = useState<TimelineSegmentType[]>(
    initialSegments
  );

  const updateSegments = useCallback(() => {
    const newNow = DateTime.local().setZone(timezone);
    const newSegments: TimelineSegmentType[] = resolveTimelineSegments(
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
  displayNowTimeMarker?: boolean;
  displayBaseTimeMarker?: boolean;
}

export const Timeline: React.FunctionComponent<Props> = (props) => {
  const {
    sessions,
    timezone,
    displayNowTimeMarker = true,
    displayBaseTimeMarker = true,
  } = props;

  const segments = useSegments(sessions, timezone);
  const timelineSegments = segments.map((segment) => {
    return <TimelineSegment segment={segment} timelineSize={timelineSize} />;
  });

  const classes = useStyles();
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
            <TimelineSegmentDefault />
          )}
        </Box>
      </Box>
    </Box>
  );
};
