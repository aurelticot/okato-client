import React, { useEffect, useCallback, useState } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { config } from "../../../../config";
import { useFrequency } from "../../../../lib/hooks";
import { oneMinuteInMillis } from "../../../../lib/constants";
import { getTimelineSizeInMinutes } from "../../../../lib/utils";
import { TimelineTime } from "../TimelineTime";

const { daysInFuture, daysInPast, timelineVisiblePeriod } = config;
const timelineSize = getTimelineSizeInMinutes();

const useStyles = makeStyles((theme) => ({
  rulerTimeWrapper: {
    background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 20%, ${theme.palette.background.default} 80%, rgba(255,255,255,0) 100%)`,
    padding: "0 30px",
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

interface Props {
  baseTime: Date | null;
  onClickBackToRealTime: () => void;
}

export const TimelineRuler: React.FunctionComponent<Props> = (props) => {
  const { baseTime, onClickBackToRealTime } = props;
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
  const aboveSM = useMediaQuery(theme.breakpoints.up("sm"));

  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          position: "absolute",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box className={classes.rulerTimeWrapper}>
          <TimelineTime
            time={baseTime}
            onClickBackToRealTime={onClickBackToRealTime}
          />
        </Box>
      </Box>
      <Box className={classes.ruler}>
        {segments.map((daySegment) => {
          return (
            <Box
              key={daySegment.start}
              className={classes.daySegment}
              style={{
                width: `${(daySegment.duration * 100) / timelineSize}%`,
              }}
            >
              <Box className={classes.daySegmentContent}>{daySegment.date}</Box>
              <Box className={classes.hourSegmentsContainer}>
                {daySegment.hourSegments.map((hourSegment) => {
                  return (
                    <Box
                      key={hourSegment.start}
                      className={classes.hourSegment}
                      style={{
                        width: `${
                          (hourSegment.duration * 100) / daySegment.duration
                        }%`,
                      }}
                    >
                      <Box className={classes.hourSegmentContent}>
                        {aboveSM && hourSegment.time}
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
