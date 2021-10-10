import React, { useState } from "react";
import { useScheduleJob } from "lib/hooks";
import { everyMinuteSchedule } from "lib/constants";

export const TimeContext = React.createContext<Date>(new Date());

export const TimeProvider: React.FunctionComponent = (props) => {
  const [time, setTime] = useState<Date>(new Date());

  useScheduleJob(
    everyMinuteSchedule,
    () => {
      setTime(new Date());
    },
    []
  );

  return (
    <TimeContext.Provider value={time}>{props.children}</TimeContext.Provider>
  );
};
