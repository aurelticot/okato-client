import { DateTime } from "luxon";
import { MarketSession, MarketStatus, TimelineSegment } from "../types";
import { config } from "../../config";

const { daysInFuture, daysInPast, timelineVisiblePeriod } = config;

const cleanTimelineSegments = (
  segments: TimelineSegment[]
): TimelineSegment[] => {
  const size = segments.length;
  const returnedSegments: TimelineSegment[] = [...segments]
    .sort((a, b) => {
      return a.start - b.start;
    })
    .map((segment, index, array) => {
      let duration = segment.duration;

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

const fillGapTimelineSegments = (
  segments: TimelineSegment[],
  timelineSize: number
): TimelineSegment[] => {
  const size = segments.length;
  const completedSegments: TimelineSegment[] = [];

  segments
    .sort((a, b) => {
      return a.start - b.start;
    })
    // eslint-disable-next-line array-callback-return
    .map((segment, index, array) => {
      const { start, duration } = segment;
      const end = start + duration;
      if (index === 0 && start !== 0) {
        completedSegments.push({
          start: 0,
          duration: start,
          status: MarketStatus.CLOSE,
        });
      }

      const nextIndex = index + 1;
      if (nextIndex < size) {
        const nextSegment = array[nextIndex];
        if (end !== nextSegment.start) {
          completedSegments.push({
            start: end,
            duration: nextSegment.start - end,
            status: MarketStatus.CLOSE,
          });
        }
      } else if (end !== timelineSize) {
        completedSegments.push({
          start: end,
          duration: timelineSize - end,
          status: MarketStatus.CLOSE,
        });
      }

      completedSegments.push(segment);
    });

  return completedSegments.sort((a, b) => {
    return a.start - b.start;
  });
};

/**
 * get the size of the timeline in minutes.
 */
export const getTimelineSize = (): number => {
  return ((daysInFuture + daysInPast) * 24 + timelineVisiblePeriod) * 60;
};

export const resolveTimelineSegments = (
  time: DateTime,
  timezone: string,
  sessions: MarketSession[]
): TimelineSegment[] => {
  const timelineStart = time
    .minus({
      days: daysInPast,
      hours: timelineVisiblePeriod / 2,
    })
    .startOf("minute");
  const timelineEnd = time
    .plus({
      days: daysInFuture,
      hours: timelineVisiblePeriod / 2,
    })
    .startOf("minute");
  const timelineSize = getTimelineSize();

  const segments = sessions
    .filter((session) => {
      const { start, end } = session;
      const sessionStartTime = DateTime.fromJSDate(start, {
        zone: timezone,
      }).startOf("minute");
      const sessionEndTime = DateTime.fromJSDate(end, {
        zone: timezone,
      }).startOf("minute");
      return !(
        sessionEndTime < timelineStart || sessionStartTime > timelineEnd
      );
    })
    .map((session) => {
      const { start, end, status } = session;
      let sessionStartTime = DateTime.fromJSDate(start, {
        zone: timezone,
      });
      if (sessionStartTime < timelineStart) {
        sessionStartTime = timelineStart;
      }
      let sessionEndTime = DateTime.fromJSDate(end, {
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

  const completedSegments = fillGapTimelineSegments(segments, timelineSize);
  return cleanTimelineSegments(completedSegments);
};
