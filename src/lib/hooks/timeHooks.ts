import { useEffect, useState } from "react";
import {
  JobCallback,
  scheduleJob,
  RecurrenceRule,
  RecurrenceSpecDateRange,
  RecurrenceSpecObjLit,
} from "node-schedule";
import { everyMinuteSchedule } from "lib/constants";

type FrequencyRule =
  | string
  | number
  | Date
  | RecurrenceRule
  | RecurrenceSpecDateRange
  | RecurrenceSpecObjLit;

export const useScheduleJob = (
  frequencyRule: FrequencyRule,
  jobFunction: JobCallback,
  deps?: React.DependencyList
) => {
  useEffect(() => {
    const job = scheduleJob(frequencyRule, jobFunction);
    return () => {
      job.cancel();
    };
  }, [frequencyRule, jobFunction, deps]);
  return;
};

export const useRealTime = (
  frequencyRule: FrequencyRule = everyMinuteSchedule
): Date => {
  const [time, setTime] = useState<Date>(new Date());
  useScheduleJob(
    frequencyRule,
    () => {
      setTime(new Date());
    },
    []
  );
  return time;
};
