import React, { useEffect, useCallback, useState } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, useMediaQuery, useTheme } from "@material-ui/core";
import { config } from "config";
import { useFrequency } from "lib/hooks";
import { oneMinuteInMillis } from "lib/constants";
import { FluidText } from "components/atoms";
import { getTimelineSizeInMinutes, getFluidTextValues } from "lib/utils";
import { TimelineRulerTime } from "components/organisms";
import { useIntl } from "react-intl";

const { daysInFuture, daysInPast, timelineVisiblePeriod } = config;
const timelineSize = getTimelineSizeInMinutes();

const useStyles = makeStyles((theme) => ({
  rulerContainer: {
    backgroundColor: theme.palette.background.default,
    padding: `${theme.spacing(1)}px 0`,
  },
  rulerTimeContainer: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  ruler: {
    display: "flex",
    color: theme.palette.text.disabled,
  },
  daySegment: {
    borderLeft: `1px solid ${theme.palette.text.secondary}`,
  },
  daySegmentContent: {
    paddingLeft: "0.25em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "capitalize",
    lineHeight: 1.075,
    height: "1.075em",
    margin: "0.4em 0",
  },
  hourSegmentsContainer: {
    display: "flex",
  },
  hourSegmentContent: {
    "paddingLeft": "0.25em",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "lineHeight": 1.075,
    "height": "1.075em",
    "margin": "0.4em 0",
    "borderLeft": `1px solid ${theme.palette.text.secondary}`,
    "&:first-child": {
      borderLeft: "none",
    },
  },
}));

const dayFluidText = getFluidTextValues(0.8);
const hourFluidText = getFluidTextValues(0.8);

interface Segment {
  start: number;
  duration: number;
}

interface HourRulerSegment extends Segment {
  time: string;
}

interface DayRulerSegment extends Segment {
  date: Date;
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
    const nextCursor = cursor.plus({ hours: 1 });
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
    const nextDayCursor = dayCursor.plus({ days: 1 });
    const segmentStart = dayCursor < start ? start : dayCursor;
    const segmentEnd = nextDayCursor > end ? end : nextDayCursor;

    segments.push({
      start: segmentStart.diff(start).as("minutes"),
      duration: segmentEnd.diff(segmentStart).as("minutes"),
      date: segmentStart.toJSDate(),
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
}

export const TimelineRuler: React.FunctionComponent<Props> = (props) => {
  const { baseTime } = props;
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
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const i18n = useIntl();
  const classes = useStyles();
  return (
    <Paper className={classes.rulerContainer} elevation={0}>
      <Box className={classes.rulerTimeContainer}>
        <TimelineRulerTime baseTime={baseTime} />
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
              <FluidText
                {...dayFluidText}
                className={classes.daySegmentContent}
              >
                {i18n.formatDate(daySegment.date, { weekday: "long" })}
              </FluidText>

              <Box className={classes.hourSegmentsContainer}>
                {daySegment.hourSegments.map((hourSegment) => {
                  return (
                    <FluidText
                      key={hourSegment.start}
                      {...hourFluidText}
                      className={classes.hourSegmentContent}
                      style={{
                        width: `${
                          (hourSegment.duration * 100) / daySegment.duration
                        }%`,
                      }}
                    >
                      {smUp ? hourSegment.time : "\u00A0"}
                    </FluidText>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
