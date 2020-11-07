import React, { useEffect, useCallback, useState } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";
import { config } from "../../../../../../../../config";
import { useFrequency } from "../../../../../../../../lib/hooks";
import { oneMinuteInMillis } from "../../../../../../../../lib/constants";
import { FluidText } from "../../../../../../../../lib/components";
import {
  getTimelineSizeInMinutes,
  getFluidTextValues,
} from "../../../../../../../../lib/utils";
import { TimelineTime } from "./components";
import { useIntl } from "react-intl";

const { daysInFuture, daysInPast, timelineVisiblePeriod } = config;
const timelineSize = getTimelineSizeInMinutes();

const useStyles = makeStyles((theme) => ({
  rulerTimeContainer: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  ruler: {
    display: "flex",
    color: theme.palette.text.disabled,
    paddingTop: theme.spacing(2),
  },
  daySegment: {
    borderLeft: `1px solid ${theme.palette.text.secondary}`,
    paddingBottom: theme.spacing(0.5),
  },
  daySegmentContent: {
    paddingLeft: theme.spacing(0.5),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "capitalize",
  },
  hourSegmentsContainer: {
    display: "flex",
  },
  hourSegment: {
    "borderLeft": `1px solid ${theme.palette.text.secondary}`,
    "&:first-child": {
      borderLeft: "none",
    },
  },
  hourSegmentContent: {
    paddingLeft: theme.spacing(0.5),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const mainFluidText = getFluidTextValues(1);

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
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const i18n = useIntl();
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.rulerTimeContainer}>
        <TimelineTime
          time={baseTime}
          onClickBackToRealTime={onClickBackToRealTime}
        />
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
                {...mainFluidText}
                className={classes.daySegmentContent}
              >
                {i18n.formatDate(daySegment.date, { weekday: "long" })}
              </FluidText>

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
                      <FluidText
                        {...mainFluidText}
                        className={classes.hourSegmentContent}
                      >
                        {smUp ? hourSegment.time : "\u00A0"}
                      </FluidText>
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
