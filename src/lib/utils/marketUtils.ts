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
  baseTime: Date,
  market: Market,
  useMain = false
): MarketStatus => {
  const { timezone, sessions } = market;
  const adjustedBaseTime = DateTime.fromJSDate(baseTime, { zone: timezone });
  const status = sessions.reduce<MarketStatus>((value, session) => {
    const sessionStart = DateTime.fromJSDate(session.start, {
      zone: timezone,
    }).startOf("minute");
    const sessionEnd = DateTime.fromJSDate(session.end, {
      zone: timezone,
    }).endOf("minute");
    if (sessionStart <= adjustedBaseTime && sessionEnd >= adjustedBaseTime) {
      return session.status;
    }
    return value;
  }, MarketStatus.CLOSE);
  return useMain ? getMarketMainStatusFromStatus(status) : status;
};

export const fillBlankWithClosedSessions = (
  sessions: MarketSession[],
  startDate: Date,
  endDate: Date
): MarketSession[] => {
  const completeSessions: MarketSession[] = [];
  const size = sessions.length;
  const overallStartDate = DateTime.fromJSDate(startDate);
  const overallEndDate = DateTime.fromJSDate(endDate);

  sessions
    .sort((sessionA, sessionB) => {
      return sessionA.start.getTime() - sessionB.start.getTime();
    })
    .map((session, index, array) => {
      const { start, end } = session;
      const sessionStartDate = DateTime.fromJSDate(start);
      const sessionEndDate = DateTime.fromJSDate(end);

      if (index === 0 && sessionStartDate > overallStartDate) {
        completeSessions.push({
          start: overallStartDate.toJSDate(),
          end: sessionStartDate.toJSDate(),
          mainStatus: MarketStatus.CLOSE,
          status: MarketStatus.CLOSE,
        });
      }
      completeSessions.push(session);

      const nextIndex = index + 1;
      if (nextIndex < size) {
        const { start: nextSessionStart } = array[nextIndex];
        const nextSessionStartDate = DateTime.fromJSDate(nextSessionStart);
        if (sessionEndDate < nextSessionStartDate.minus({ seconds: 1 })) {
          completeSessions.push({
            start: sessionEndDate
              .plus({ minutes: 1 })
              .startOf("minute")
              .toJSDate(),
            end: nextSessionStartDate
              .minus({ minutes: 1 })
              .endOf("minute")
              .toJSDate(),
            mainStatus: MarketStatus.CLOSE,
            status: MarketStatus.CLOSE,
          });
        }
      } else if (sessionEndDate < overallEndDate) {
        completeSessions.push({
          start: sessionEndDate.toJSDate(),
          end: overallEndDate.toJSDate(),
          mainStatus: MarketStatus.CLOSE,
          status: MarketStatus.CLOSE,
        });
      }

      return session;
    });
  return completeSessions;
};

export const getCurrentSession = (
  baseTime: Date,
  market: Market
): MarketSession | null => {
  const { timezone, sessions } = market;
  const adjustedBaseTime = DateTime.fromJSDate(baseTime, { zone: timezone });

  return [...sessions]
    .sort(
      (sessionA, sessionB) =>
        sessionA.start.getTime() - sessionB.start.getTime()
    )
    .reduce<MarketSession | null>((value, session) => {
      const { start, end } = session;
      const startDate = DateTime.fromJSDate(start);
      const endDate = DateTime.fromJSDate(end);
      return startDate < adjustedBaseTime && adjustedBaseTime < endDate
        ? session
        : value;
    }, null);
};

export const getMarketNextEvent = (
  baseTime: Date,
  market: Market,
  useMain = false
): MarketSession | null => {
  const { timezone, sessions } = market;
  const currentStatus = getMarketStatus(baseTime, market, useMain);
  const adjustedBaseTime = DateTime.fromJSDate(baseTime, { zone: timezone });
  const nextSessions = sessions
    .filter((session) => {
      const sessionStartDate = DateTime.fromJSDate(session.start, {
        zone: timezone,
      }).startOf("minute");
      const differentSubStatus = currentStatus !== session.status;
      const differentMainStatus =
        getMarketMainStatusFromStatus(currentStatus) !==
        getMarketMainStatusFromStatus(session.status);
      const differentStatus = useMain
        ? differentMainStatus
        : differentSubStatus;
      const sessionAfterBase = sessionStartDate > adjustedBaseTime;
      return sessionAfterBase && differentStatus;
    })
    .sort(
      (sessionA, sessionB) =>
        sessionA.start.getTime() - sessionB.start.getTime()
    );
  return nextSessions[0];
};
