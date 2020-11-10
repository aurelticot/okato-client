import { useState, useEffect } from "react";
import { oneMinuteInMillis } from "lib/constants";
import { Market, MarketSession, MarketStatus } from "lib/types";
import { getMarketNextEvent, getMarketStatus } from "lib/utils";
import { useFrequency } from "./timeHooks";

export const useMarketStatus = (
  market: Market,
  useMain = false,
  baseTime: Date | null
): MarketStatus => {
  const time = useFrequency(oneMinuteInMillis);
  const [status, setStatus] = useState<MarketStatus>(MarketStatus.CLOSE);

  useEffect(() => {
    const currentStatus = getMarketStatus(baseTime || time, market, useMain);
    setStatus(currentStatus);
  }, [time, market, baseTime, useMain]);
  return status;
};

export const useMarketNextEvent = (
  market: Market,
  useMain = false,
  baseTime?: Date
): MarketSession | null => {
  const time = useFrequency(oneMinuteInMillis);
  const [nextEvent, setNextEvent] = useState<MarketSession | null>(null);

  useEffect(() => {
    setNextEvent(getMarketNextEvent(baseTime || time, market, useMain));
  }, [time, market, baseTime, useMain]);
  return nextEvent;
};
