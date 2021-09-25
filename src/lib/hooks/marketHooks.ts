import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { oneMinuteInMillis } from "lib/constants";
import { Market, MarketSession, MarketStatus } from "lib/types";
import { getMarketNextEvent, getMarketStatus } from "lib/utils";
import { useFrequency } from "./timeHooks";

export const useMarketStatus = (
  market: Market,
  useMain = false,
  baseTime?: DateTime
): MarketStatus => {
  const time = useFrequency(oneMinuteInMillis);
  const [status, setStatus] = useState<MarketStatus>(MarketStatus.CLOSE);

  useEffect(() => {
    const currentStatus = getMarketStatus(
      baseTime || DateTime.fromJSDate(time),
      market,
      useMain
    );
    setStatus(currentStatus);
  }, [time, market, baseTime, useMain]);
  return status;
};

export const useMarketNextEvent = (
  market: Market,
  useMain = false,
  baseTime?: DateTime
): MarketSession | null => {
  const time = useFrequency(oneMinuteInMillis);
  const [nextEvent, setNextEvent] = useState<MarketSession | null>(null);

  useEffect(() => {
    setNextEvent(
      getMarketNextEvent(baseTime || DateTime.fromJSDate(time), market, useMain)
    );
  }, [time, market, baseTime, useMain]);
  return nextEvent;
};
