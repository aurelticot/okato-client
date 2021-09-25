import { DateTime } from "luxon";
import {
  MarketStatus,
  Market,
  MarketSortingMethod,
  MarketSession,
} from "lib/types";

interface ComparableMarket {
  shortName: string;
  longitude: number;
  capitalisation?: number | null;
}

export const sortMarketAlphabetically = <TData extends ComparableMarket>(
  marketA: TData,
  marketB: TData
) => {
  return marketA.shortName.localeCompare(marketB.shortName);
};

export const sortMarketAlphabeticallyReverse = <TData extends ComparableMarket>(
  marketA: TData,
  marketB: TData
) => {
  return sortMarketAlphabetically<TData>(marketB, marketA);
};

export const sortMarketChronologically = <TData extends ComparableMarket>(
  marketA: TData,
  marketB: TData
) => {
  return marketB.longitude - marketA.longitude;
};

export const sortMarketChronologicallyReverse = <
  TData extends ComparableMarket
>(
  marketA: TData,
  marketB: TData
) => {
  return sortMarketChronologically<TData>(marketB, marketA);
};

export const sortMarketByCapitalisation = <TData extends ComparableMarket>(
  marketA: TData,
  marketB: TData
) => {
  return (marketB.capitalisation || 0) - (marketA.capitalisation || 0);
};

export const sortMarketByCapitalisationReverse = <
  TData extends ComparableMarket
>(
  marketA: TData,
  marketB: TData
) => {
  return sortMarketByCapitalisation<TData>(marketB, marketA);
};

export const getMarketSortingMethodByString = (sortingMethodString: string) => {
  switch (sortingMethodString) {
    case MarketSortingMethod.ALPHABETICALLY:
      return MarketSortingMethod.ALPHABETICALLY;
    case MarketSortingMethod.ALPHABETICALLY_REVERSE:
      return MarketSortingMethod.ALPHABETICALLY_REVERSE;
    case MarketSortingMethod.CHRONOLOGICALLY:
      return MarketSortingMethod.CHRONOLOGICALLY;
    case MarketSortingMethod.CHRONOLOGICALLY_REVERSE:
      return MarketSortingMethod.CHRONOLOGICALLY_REVERSE;
    case MarketSortingMethod.CAPITALISATION:
      return MarketSortingMethod.CAPITALISATION;
    case MarketSortingMethod.CAPITALISATION_REVERSE:
      return MarketSortingMethod.CAPITALISATION_REVERSE;
    default:
      return MarketSortingMethod.CAPITALISATION;
  }
};

export const getMarketSortingFunction = (
  sortingMethod: MarketSortingMethod | string
): (<TData extends ComparableMarket>(
  marketA: TData,
  marketB: TData
) => number) => {
  switch (sortingMethod) {
    case MarketSortingMethod.ALPHABETICALLY:
      return sortMarketAlphabetically;
    case MarketSortingMethod.ALPHABETICALLY_REVERSE:
      return sortMarketAlphabeticallyReverse;
    case MarketSortingMethod.CHRONOLOGICALLY:
      return sortMarketChronologically;
    case MarketSortingMethod.CHRONOLOGICALLY_REVERSE:
      return sortMarketChronologicallyReverse;
    case MarketSortingMethod.CAPITALISATION:
      return sortMarketByCapitalisation;
    case MarketSortingMethod.CAPITALISATION_REVERSE:
      return sortMarketByCapitalisationReverse;
    default:
      return sortMarketByCapitalisation;
  }
};

export const getMarketStatusFromString = (status: string): MarketStatus => {
  switch (status) {
    case MarketStatus.OPEN:
      return MarketStatus.OPEN;
    case MarketStatus.BREAK:
      return MarketStatus.BREAK;
    case MarketStatus.BEFORE_MARKET:
      return MarketStatus.BEFORE_MARKET;
    case MarketStatus.AFTER_MARKET:
      return MarketStatus.AFTER_MARKET;
    case MarketStatus.CLOSE:
      return MarketStatus.CLOSE;
    case MarketStatus.CLOSE_SPECIAL:
      return MarketStatus.CLOSE_SPECIAL;
    default:
      return MarketStatus.CLOSE;
  }
};

export const getMarketMainStatusFromStatus = (
  status: MarketStatus
): MarketStatus => {
  switch (status) {
    case MarketStatus.OPEN:
      return MarketStatus.OPEN;
    case MarketStatus.CLOSE:
    case MarketStatus.CLOSE_SPECIAL:
    case MarketStatus.BREAK:
    case MarketStatus.BEFORE_MARKET:
    case MarketStatus.AFTER_MARKET:
    default:
      return MarketStatus.CLOSE;
  }
};

export const getMarketStatus = (
  baseTime: DateTime,
  market: Market,
  useMain = false
): MarketStatus => {
  const { sessions } = market;
  const status = sessions.reduce<MarketStatus>((value, session) => {
    const { start, end } = session;
    if (start <= baseTime && end >= baseTime) {
      return session.status;
    }
    return value;
  }, MarketStatus.CLOSE);
  return useMain ? getMarketMainStatusFromStatus(status) : status;
};

export const getCurrentSession = (
  baseTime: DateTime,
  market: Market
): MarketSession | null => {
  const { sessions } = market;
  return [...sessions]
    .sort(
      (sessionA, sessionB) =>
        sessionA.start.toMillis() - sessionB.start.toMillis()
    )
    .reduce<MarketSession | null>((value, session) => {
      const { start, end } = session;
      return start < baseTime && baseTime < end ? session : value;
    }, null);
};

export const getMarketNextEvent = (
  baseTime: DateTime,
  market: Market,
  useMain = false
): MarketSession | null => {
  const { sessions } = market;
  const currentStatus = getMarketStatus(baseTime, market, useMain);
  const nextSessions = sessions
    .filter((session) => {
      const { start } = session;
      const differentSubStatus = currentStatus !== session.status;
      const differentMainStatus =
        getMarketMainStatusFromStatus(currentStatus) !==
        getMarketMainStatusFromStatus(session.status);
      const differentStatus = useMain
        ? differentMainStatus
        : differentSubStatus;
      const sessionAfterBase = start > baseTime;
      return sessionAfterBase && differentStatus;
    })
    .sort(
      (sessionA, sessionB) =>
        sessionA.start.toMillis() - sessionB.start.toMillis()
    );
  return nextSessions[0];
};
