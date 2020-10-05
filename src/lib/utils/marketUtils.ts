import { DateTime } from "luxon";
import {
  MarketStatus,
  Market,
  MarketSortingMethod,
  MarketSession,
} from "../types";

export const sortMarketAlphabetically = (marketA: Market, marketB: Market) => {
  return marketA.name.localeCompare(marketB.name);
};

export const sortMarketAlphabeticallyReverse = (
  marketA: Market,
  marketB: Market
) => {
  return sortMarketAlphabetically(marketB, marketA);
};

export const sortMarketChronologically = (marketA: Market, marketB: Market) => {
  return marketB.longitude - marketA.longitude;
};

export const sortMarketChronologicallyReverse = (
  marketA: Market,
  marketB: Market
) => {
  return sortMarketChronologically(marketB, marketA);
};

export const sortMarketByCapitalisation = (
  marketA: Market,
  marketB: Market
) => {
  return marketB.capitalisation - marketA.capitalisation;
};

export const sortMarketByCapitalisationReverse = (
  marketA: Market,
  marketB: Market
) => {
  return sortMarketByCapitalisation(marketB, marketA);
};

export const getMarketSortingMethodByString = (
  sortingMethodString: string | string[]
) => {
  const methodToCheck = Array.isArray(sortingMethodString)
    ? sortingMethodString[0]
    : sortingMethodString;
  switch (methodToCheck) {
    case MarketSortingMethod.Alphabetically:
      return MarketSortingMethod.Alphabetically;
    case MarketSortingMethod.AlphabeticallyReverse:
      return MarketSortingMethod.AlphabeticallyReverse;
    case MarketSortingMethod.Chronologically:
      return MarketSortingMethod.Chronologically;
    case MarketSortingMethod.ChronologicallyReverse:
      return MarketSortingMethod.ChronologicallyReverse;
    case MarketSortingMethod.Capitalisation:
      return MarketSortingMethod.Capitalisation;
    case MarketSortingMethod.CapitalisationReverse:
      return MarketSortingMethod.CapitalisationReverse;
    default:
      return MarketSortingMethod.Capitalisation;
  }
};

export const getMarketSortingFunction = (
  sortingMethod: MarketSortingMethod
): ((marketA: Market, marketB: Market) => number) => {
  switch (sortingMethod) {
    case MarketSortingMethod.Alphabetically:
      return sortMarketAlphabetically;
    case MarketSortingMethod.AlphabeticallyReverse:
      return sortMarketAlphabeticallyReverse;
    case MarketSortingMethod.Chronologically:
      return sortMarketChronologically;
    case MarketSortingMethod.ChronologicallyReverse:
      return sortMarketChronologicallyReverse;
    case MarketSortingMethod.Capitalisation:
      return sortMarketByCapitalisation;
    case MarketSortingMethod.CapitalisationReverse:
      return sortMarketByCapitalisationReverse;
    default:
      return sortMarketByCapitalisation;
  }
};

export const getMarketStatusFromString = (status: string): MarketStatus => {
  switch (status) {
    case "open":
      return MarketStatus.Opened;
    case "break":
      return MarketStatus.Break;
    case "before_market":
      return MarketStatus.BeforeMarket;
    case "after_market":
      return MarketStatus.AfterMarket;
    case "close":
      return MarketStatus.Closed;
    case "close_special":
      return MarketStatus.ClosedSpecial;
    default:
      return MarketStatus.Closed;
  }
};

export const getMarketMainStatus = (status: MarketStatus): MarketStatus => {
  switch (status) {
    case MarketStatus.Opened:
    case MarketStatus.Break:
      return MarketStatus.Opened;
    case MarketStatus.ClosedSpecial:
    case MarketStatus.Closed:
    case MarketStatus.BeforeMarket:
    case MarketStatus.AfterMarket:
    default:
      return MarketStatus.Closed;
  }
};

export const getMarketStatus = (
  baseDate: Date,
  market: Market
): MarketStatus => {
  const { timezone, sessions } = market;
  const baseTime = DateTime.fromJSDate(baseDate, { zone: timezone });
  return sessions.reduce<MarketStatus>((value, session) => {
    const sessionStart = DateTime.fromJSDate(session.startTime, {
      zone: timezone,
    });
    const sessionEnd = DateTime.fromJSDate(session.endTime, {
      zone: timezone,
    }).endOf("minute");
    if (sessionStart <= baseTime && sessionEnd >= baseTime) {
      return session.status;
    }
    return value;
  }, MarketStatus.Closed);
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
      const sessionStartTime = DateTime.fromJSDate(session.startTime, {
        zone: timezone,
      });
      const differentSubStatus = currentStatus !== session.status;
      const differentMainStatus =
        getMarketMainStatus(currentStatus) !==
        getMarketMainStatus(session.status);
      const differentStatus = useMain
        ? differentMainStatus
        : differentSubStatus;
      const sessionAfterBase = sessionStartTime > baseTime;
      return sessionAfterBase && differentStatus;
    })
    .sort((sessionA, sessionB) => {
      return sessionA.startTime.getTime() - sessionB.startTime.getTime();
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
