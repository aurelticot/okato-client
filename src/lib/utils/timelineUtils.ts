import { config } from "config";

const { timelineTotalPeriod, timelineVisiblePeriod } = config;

/**
 * get the size of the timeline in hours.
 */
export const getTimelineSizeInHours = (): number => {
  return timelineTotalPeriod;
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
export const getTimelineVisibleSizeInHours = (): number => {
  return timelineVisiblePeriod;
};

/**
 * get the visible size of the timeline in minutes.
 */
export const getTimelineVisibleSizeInMinutes = (): number => {
  return getTimelineVisibleSizeInHours() * 60;
};

/**
 * get the visible size of the timeline in seconds.
 */
export const getTimelineVisibleSizeInSeconds = (): number => {
  return getTimelineVisibleSizeInMinutes() * 60;
};
