import { useContext, useEffect, useState } from "react";
import { TimeContext } from "../../contexts/TimeProvider";

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
