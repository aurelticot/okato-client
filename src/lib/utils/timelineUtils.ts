import { DateTime } from "luxon";
import { MarketSession, MarketStatus, TimelineSegment } from "lib/types";
import { config } from "config";

const { daysInFuture, daysInPast, timelineVisiblePeriod } = config;

/**
 * get the size of the timeline in hours.
 */
export const getTimelineSizeInHours = (): number => {
  return (daysInFuture + daysInPast) * 24 + timelineVisiblePeriod;
};

/**
 * get the size of the timeline in minutes.
 */
export const getTimelineSizeInMinutes = (): number => {
  return getTimelineSizeInHours() * 60;
};

/**
 * get the size of the timeline in seconds.
 */
export const getTimelineSizeInSeconds = (): number => {
  return getTimelineSizeInMinutes() * 60;
};

/**
 * get the visible size of the timeline in hours.
 */
export const getTimelienVisibleSizeInHours = (): number => {
  return timelineVisiblePeriod;
};

/**
 * get the visible size of the timeline in minutes.
 */
export const getTimelienVisibleSizeInMinutes = (): number => {
  return getTimelienVisibleSizeInHours() * 60;
};

/**
 * get the visible size of the timeline in seconds.
 */
export const getTimelienVisibleSizeInSeconds = (): number => {
  return getTimelienVisibleSizeInMinutes() * 60;
};

const cleanTimelineSegments = (
  segments: TimelineSegment[]
): TimelineSegment[] => {
  const getNextSegmentDuration = (
    status: MarketStatus,
    array: TimelineSegment[],
    nextIndex: number
  ): number => {
    if (nextIndex >= array.length) {
      return 0;
    }
    const nextSegment = array[nextIndex];
    if (nextSegment.status !== status) {
      return 0;
    }
    return (
      nextSegment.duration +
      getNextSegmentDuration(status, array, nextIndex + 1)
    );
  };

  const returnedSegments: TimelineSegment[] = [...segments]
    .sort((a, b) => {
      return a.start - b.start;
    })
    .map((segment, index, array) => {
      let duration = segment.duration;

      duration += getNextSegmentDuration(segment.status, array, index + 1);

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
      const { startDate, endDate, start, duration } = segment;
      const end = start + duration;
      if (index === 0 && start !== 0) {
        completedSegments.push({
          startDate: DateTime.fromJSDate(startDate)
            .minus({ days: 1 })
            .toJSDate(),
          endDate: startDate,
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
            startDate: endDate,
            endDate: nextSegment.startDate,
            start: end,
            duration: nextSegment.start - end,
            status: MarketStatus.CLOSE,
          });
        }
      } else if (end !== timelineSize) {
        completedSegments.push({
          startDate: endDate,
          endDate: DateTime.fromJSDate(endDate).plus({ days: 1 }).toJSDate(),
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
  const timelineSize = getTimelineSizeInMinutes();

  const segments: TimelineSegment[] = sessions
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
      const { start, end, mainStatus } = session;
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
        startDate: start,
        endDate: end,
        start: sessionStartTime.diff(timelineStart).as("minutes"),
        duration: sessionEndTime.diff(sessionStartTime).as("minutes"),
        status: mainStatus,
        // TODO use status instead of mainStatus when backend will handle it.
      };
    });

  const completedSegments = fillGapTimelineSegments(segments, timelineSize);
  return cleanTimelineSegments(completedSegments);
};
