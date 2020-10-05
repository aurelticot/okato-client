import { DateTime } from "luxon";
import { useState, useEffect } from "react";

export const useRealTime = (timezone = "local"): Date => {
  const [time, setTime] = useState(
    DateTime.fromJSDate(new Date(), { zone: timezone }).toJSDate()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(DateTime.fromJSDate(new Date(), { zone: timezone }).toJSDate());
    }, 500);
    return function () {
      clearInterval(timer);
    };
  });

  return time;
};
