import { DateTime } from "luxon";
import { MarketSession, TimelineSegment } from "../types";
import { config } from "../../config";

const { daysInFuture, daysInPast, timelineVisiblePeriod } = config;

const cleanTimelineSegments = (
  segments: TimelineSegment[]
): TimelineSegment[] => {
  const returnedSegments: TimelineSegment[] = [...segments]
    .sort((a, b) => {
      return a.start - b.start;
    })
    .map((segment: TimelineSegment, index, array) => {
      let duration = segment.duration;
      const size = array.length;

      const nextIndex = index + 1;
      if (nextIndex < size) {
        const nextSegment = array[nextIndex];
        if (segment.status === nextSegment.status) {
          duration += nextSegment.duration;
        }
      }

      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        const previousSegment = array[previousIndex];
        if (segment.status === previousSegment.status) {
          duration = 0;
        }
      }

      return { ...segment, duration };
    })
    .filter((segment: TimelineSegment) => segment.duration !== 0);

  return returnedSegments;
};

export const resolveTimelineSegments = (
  time: DateTime,
  timezone: string,
  sessions: MarketSession[]
): TimelineSegment[] => {
  const timelineStart = time.minus({
    days: daysInPast,
    hours: timelineVisiblePeriod / 2,
  });
  const timelineEnd = time.plus({
    days: daysInFuture,
    hours: timelineVisiblePeriod / 2,
  });

  const segments = sessions
    .filter((session) => {
      const { date, startTime, endTime } = session;
      return !(
        DateTime.fromISO(`${date}T${startTime}`, { zone: timezone }) >
          timelineEnd ||
        DateTime.fromISO(`${date}T${endTime}`, { zone: timezone }) <
          timelineStart
      );
    })
    .map((session) => {
      const { date, startTime, endTime, status } = session;
      let sessionStartTime = DateTime.fromISO(`${date}T${startTime}`, {
        zone: timezone,
      });
      if (sessionStartTime < timelineStart) {
        sessionStartTime = timelineStart;
      }
      let sessionEndTime = DateTime.fromISO(`${date}T${endTime}`, {
        zone: timezone,
      });
      if (sessionEndTime > timelineEnd) {
        sessionEndTime = timelineEnd;
      }
      return {
        start: sessionStartTime.diff(timelineStart).as("minutes"),
        duration: sessionEndTime.diff(sessionStartTime).as("minutes") + 1,
        status,
      };
    });

  return cleanTimelineSegments(segments);
};
