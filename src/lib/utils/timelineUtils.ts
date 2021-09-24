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
