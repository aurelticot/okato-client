import { useState } from "react";
import { DateTime } from "luxon";
import { everyMinuteSchedule } from "lib/constants";
import { Market, MarketSession, MarketStatus } from "lib/types";
import { getMarketNextEvent, getMarketStatus } from "lib/utils";
import { useScheduleJob } from "./timeHooks";

export const useMarketStatus = (
  market: Market,
  useMain = false,
  baseTime?: DateTime
): MarketStatus => {
  const [status, setStatus] = useState<MarketStatus>(MarketStatus.CLOSE);

  useScheduleJob(
    everyMinuteSchedule,
    (executionTime) => {
      setStatus(
        getMarketStatus(
          baseTime || DateTime.fromJSDate(executionTime),
          market,
          useMain
        )
      );
    },
    [market, baseTime, useMain]
  );

  return status;
};

export const useMarketNextEvent = (
  market: Market,
  useMain = false,
  baseTime?: DateTime
): MarketSession | null => {
  const [nextEvent, setNextEvent] = useState<MarketSession | null>(null);

  useScheduleJob(
    everyMinuteSchedule,
    (executionTime) => {
      setNextEvent(
        getMarketNextEvent(
          baseTime || DateTime.fromJSDate(executionTime),
          market,
          useMain
        )
      );
    },
    [market, baseTime, useMain]
  );

  return nextEvent;
};
