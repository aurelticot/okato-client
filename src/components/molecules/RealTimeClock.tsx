import React from "react";
import { useRealTime } from "lib/hooks";
import { Clock } from "./Clock";

interface Props {
  timezone?: string;
  displayTimezone?: boolean;
  displayDayDiff?: boolean;
  displaySeconds?: boolean;
}

const RawRealTimeClock: React.FunctionComponent<Props> = (props) => {
  const { timezone, displayTimezone, displayDayDiff, displaySeconds } = props;

  const time = useRealTime();

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

export const RealTimeClock = React.memo(RawRealTimeClock);
