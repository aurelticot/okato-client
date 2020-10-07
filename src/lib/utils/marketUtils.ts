import { DateTime } from "luxon";
import {
  MarketStatus,
  Market,
  MarketSortingMethod,
  MarketSession,
} from "../types";

interface ComparableMarket {
  name: string;
  longitude: number;
  capitalisation?: number | null;
}

export const sortMarketAlphabetically = <TData extends ComparableMarket>(
  marketA: TData,
  marketB: TData
) => {
  return marketA.name.localeCompare(marketB.name);
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
    case MarketStatus.BREAK:
      return MarketStatus.OPEN;
    case MarketStatus.CLOSE_SPECIAL:
    case MarketStatus.CLOSE:
    case MarketStatus.BEFORE_MARKET:
    case MarketStatus.AFTER_MARKET:
    default:
      return MarketStatus.CLOSE;
  }
};

export const getMarketStatus = (
  baseDate: Date,
  market: Market,
  useMain = false
): MarketStatus => {
  const { timezone, sessions } = market;
  const baseTime = DateTime.fromJSDate(baseDate, { zone: timezone });
  const status = sessions.reduce<MarketStatus>((value, session) => {
    const sessionStart = DateTime.fromISO(
      `${session.date}T${session.startTime}`,
      {
        zone: timezone,
      }
    );
    const sessionEnd = DateTime.fromISO(`${session.date}T${session.endTime}`, {
      zone: timezone,
    }).endOf("minute");
    if (sessionStart <= baseTime && sessionEnd >= baseTime) {
      return session.status;
    }
    return value;
  }, MarketStatus.CLOSE);
  return useMain ? getMarketMainStatusFromStatus(status) : status;
};

export const getMarketNextEvent = (
  baseDate: Date,
  market: Market,
  useMain = false
): MarketSession | null => {
  const { timezone, sessions } = market;
  const currentStatus = getMarketStatus(baseDate, market);
  const baseTime = DateTime.fromJSDate(baseDate, { zone: timezone });
  const nextSessions = sessions
    .filter((session) => {
      const sessionStartTime = DateTime.fromISO(
        `${session.date}T${session.startTime}`,
        {
          zone: timezone,
        }
      );
      const differentSubStatus = currentStatus !== session.status;
      const differentMainStatus =
        getMarketMainStatusFromStatus(currentStatus) !==
        getMarketMainStatusFromStatus(session.status);
      const differentStatus = useMain
        ? differentMainStatus
        : differentSubStatus;
      const sessionAfterBase = sessionStartTime > baseTime;
      return sessionAfterBase && differentStatus;
    })
    .sort((sessionA, sessionB) => {
      return (
        DateTime.fromISO(sessionA.startTime).toMillis() -
        DateTime.fromISO(sessionB.startTime).toMillis()
      );
    });
  return nextSessions[0];
};

export const dayRotationOffset: { [key: number]: { [key: number]: number } } = {
  1: {
    5: -3,
    6: -2,
    7: -1,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
  },
  2: {
    6: -3,
    7: -2,
    1: -1,
    2: 0,
    3: 1,
    4: 2,
    5: 3,
  },
  3: {
    7: -3,
    1: -2,
    2: -1,
    3: 0,
    4: 1,
    5: 2,
    6: 3,
  },
  4: {
    1: -3,
    2: -2,
    3: -1,
    4: 0,
    5: 1,
    6: 2,
    7: 3,
  },
  5: {
    2: -3,
    3: -2,
    4: -1,
    5: 0,
    6: 1,
    7: 2,
    1: 3,
  },
  6: {
    3: -3,
    4: -2,
    5: -1,
    6: 0,
    7: 1,
    1: 2,
    2: 3,
  },
  7: {
    4: -3,
    5: -2,
    6: -1,
    7: 0,
    1: 1,
    2: 2,
    3: 3,
  },
};

export const getRotationOffset = (
  baseWeekday: number,
  sessionWeekday: number
): number => {
  return dayRotationOffset[baseWeekday][sessionWeekday];
};
