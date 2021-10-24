import React from "react";
import { useRealTime } from "lib/hooks";
import { Clock, ClockProps } from "./Clock";

const RawRealTimeClock: React.FunctionComponent<Omit<ClockProps, "time">> = (
  props
) => {
  const time = useRealTime();

  return <Clock {...props} time={time} />;
};

export const RealTimeClock = React.memo(RawRealTimeClock);
