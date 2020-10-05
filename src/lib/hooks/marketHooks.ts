import { useState, useEffect } from "react";
import { Market, MarketSession, MarketStatus } from "../types";
import {
  getMarketNextEvent,
  getMarketMainStatus,
  getMarketStatus,
} from "../utils";

export const useMarketStatus = (
  market: Market,
  useMain = false,
  baseTime: Date | null
): MarketStatus => {
  const [status, setStatus] = useState<MarketStatus>(MarketStatus.Closed);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentStatus = getMarketStatus(baseTime || new Date(), market);
      setStatus(useMain ? getMarketMainStatus(currentStatus) : currentStatus);
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  });
  return status;
};

export const useMarketNextEvent = (
  market: Market,
  useMain = false,
  baseTime?: Date
): MarketSession | null => {
  const [nextEvent, setNextEvent] = useState<MarketSession | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNextEvent(getMarketNextEvent(baseTime || new Date(), market, useMain));
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  });
  return nextEvent;
};
