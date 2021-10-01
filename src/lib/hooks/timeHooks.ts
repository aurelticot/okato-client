import { useContext, useEffect, useState } from "react";
import {
  JobCallback,
  scheduleJob,
  RecurrenceRule,
  RecurrenceSpecDateRange,
  RecurrenceSpecObjLit,
} from "node-schedule";
import { TimeContext } from "lib/contexts";

export const useRealTime = (): Date => {
  return useContext(TimeContext);
};

export const useFrequency = (frequency = 500): Date => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, frequency);
    return () => {
      clearInterval(interval);
    };
  }, [frequency]);

  return time;
};

export const useScheduleJob = (
  rule:
    | string
    | number
    | Date
    | RecurrenceRule
    | RecurrenceSpecDateRange
    | RecurrenceSpecObjLit,
  jobFunction: JobCallback,
  deps?: React.DependencyList
) => {
  useEffect(() => {
    const job = scheduleJob(rule, jobFunction);
    return () => {
      job.cancel();
    };
  }, [rule, jobFunction, deps]);
  return;
};
