import React, { useEffect, useCallback, useState } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { config } from "../../../config";
import { useFrequency } from "../../../lib/hooks";
import { oneMinuteInMillis } from "../../../lib/constants";

const { daysInFuture, daysInPast, timelineVisiblePeriod } = config;

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    margin: "10px 0 10px 0",
  },
  timeMarkerContainer: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  timeMarker: {
    height: "1em",
    zIndex: 10,
    width: "3px",
    opacity: "100%",
  },
  ruler: {
    display: "flex",
  },
  daySegment: {
    boxSizing: "border-box",
    borderLeft: "1px solid grey",
  },
  daySegmentContent: {
    boxSizing: "border-box",
    padding: "2px 0 5px 4px",
    fontSize: "0.7em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  hourSegmentsContainer: {
    display: "flex",
  },
  hourSegment: {
    "boxSizing": "border-box",
    "borderLeft": "1px solid grey",
    "&:first-child": {
      borderLeft: "none",
    },
  },
  hourSegmentContent: {
    boxSizing: "border-box",
    padding: "4px 0 0 2px",
    fontSize: "0.7em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

interface Segment {
  start: number;
  duration: number;
}

interface HourRulerSegment extends Segment {
  time: string;
}

interface DayRulerSegment extends Segment {
  date: string;
  hourSegments: HourRulerSegment[];
}

const resolveHourRulerSegment = (
  start: DateTime,
  end: DateTime
): HourRulerSegment[] => {
  const segments: HourRulerSegment[] = [];

  let cursor = start.startOf("hour");
  // eslint-disable-next-line
  while (cursor < end) {
    const nextCursor = cursor.plus({ hour: 1 });
    const segmentStart = cursor < start ? start : cursor;
    const segmentEnd = nextCursor > end ? end : nextCursor;

    segments.push({
      start: segmentStart.diff(start).as("minutes"),
      duration: segmentEnd.diff(segmentStart).as("minutes"),
      time: segmentStart.toFormat("HH"),
    });

    cursor = nextCursor;
  }

  return segments;
};

const resolveDayRulerSegments = (
  start: DateTime,
  end: DateTime
): DayRulerSegment[] => {
  const segments: DayRulerSegment[] = [];

  let dayCursor = start.startOf("day");
  // eslint-disable-next-line
  while (dayCursor < end) {
    const nextDayCursor = dayCursor.plus({ day: 1 });
    const segmentStart = dayCursor < start ? start : dayCursor;
    const segmentEnd = nextDayCursor > end ? end : nextDayCursor;

    segments.push({
      start: segmentStart.diff(start).as("minutes"),
      duration: segmentEnd.diff(segmentStart).as("minutes"),
      date: segmentStart.toISODate(),
      hourSegments: resolveHourRulerSegment(segmentStart, segmentEnd),
    });

    dayCursor = nextDayCursor;
  }

  return segments;
};

const resolveRulerSegments = (): DayRulerSegment[] => {
  const now = DateTime.local();
  const timelineStart = now
    .minus({
      days: daysInPast,
      hours: timelineVisiblePeriod / 2,
    })
    .startOf("minute");
  const timelineEnd = now
    .plus({
      days: daysInFuture,
      hours: timelineVisiblePeriod / 2,
    })
    .startOf("minute");

  return resolveDayRulerSegments(timelineStart, timelineEnd);
};

export const TimelineRuler = () => {
  const time = useFrequency(oneMinuteInMillis);
  const initialSegments = resolveRulerSegments();
  const [segments, setSegments] = useState<DayRulerSegment[]>(initialSegments);

  const updateSegment = useCallback(() => {
    const newSegments = resolveRulerSegments();
    setSegments(newSegments);
  }, []);

  useEffect(() => {
    updateSegment();
  }, [updateSegment, time]);

  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {/* <Box className={classes.timeMarkerContainer}>
        <Divider orientation="vertical" className={classes.timeMarker} />
      </Box> */}
      <Box className={classes.ruler}>
        {segments.map((daySegment, index) => {
          return (
            <Box
              key={daySegment.start}
              className={classes.daySegment}
              style={{ flexGrow: daySegment.duration }}
            >
              <Box className={classes.daySegmentContent}>{daySegment.date}</Box>
              <Box className={classes.hourSegmentsContainer}>
                {daySegment.hourSegments.map((hourSegment) => {
                  return (
                    <Box
                      key={hourSegment.start}
                      className={classes.hourSegment}
                      style={{ flexGrow: hourSegment.duration }}
                    >
                      <Box className={classes.hourSegmentContent}>
                        {upSM && hourSegment.time}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
