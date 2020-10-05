import React from "react";
import { useRealTime } from "../lib/hooks";
import { Clock } from "./Clock";

interface Props {
  timezone?: string;
  displayTimezone?: boolean;
  displayDayDiff?: boolean;
  displaySeconds?: boolean;
}

export const RealTimeClock = (props: Props) => {
  const { timezone, displayTimezone, displayDayDiff, displaySeconds } = props;

  const time = useRealTime(timezone);

  return (
    <Clock
      time={time}
      timezone={timezone}
      displayTimezone={displayTimezone}
      displayDayDiff={displayDayDiff}
      displaySeconds={displaySeconds}
    />
  );
};
