import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Market, MarketSession, TimelineSegment, SettingKey } from "lib/types";
import { getMarketSortingFunction, getTimelineSizeInHours } from "lib/utils";
import { oneMinuteInMillis } from "lib/constants";
import { useUserSetting } from "lib/hooks";
import { TimelinesContainer } from "components/organisms";
import { useQuery } from "@apollo/client";
import { MARKETS } from "lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "lib/graphql/queries/Markets/types/Markets";

const timelineSizeInHours = getTimelineSizeInHours();

const getRequestDates = () => {
  const now = DateTime.local();
  return {
    startDate: now
      .minus({
        hours: timelineSizeInHours / 2,
      })
      .startOf("minute"),
    endDate: now
      .plus({
        hours: timelineSizeInHours / 2,
      })
      .startOf("minute"),
  };
};

const PAGE_LIMIT = 20;

const useMarketsData = (selectedMarkets: string[], marketSort: string) => {
  const [markets, setMarkets] = useState<Market[] | null>(null);
  const initialRequestDates = getRequestDates();

  const { data, loading, networkStatus, error, refetch } = useQuery<
    MarketsData,
    MarketsVariables
  >(MARKETS, {
    variables: {
      selection: selectedMarkets,
      limit: PAGE_LIMIT,
      page: 1,
      startDate: initialRequestDates.startDate.toISO(),
      endDate: initialRequestDates.endDate.toISO(),
      withSessions: true,
      withTimeline: true,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedRequestDates = getRequestDates();
      refetch({
        startDate: updatedRequestDates.startDate.toISO(),
        endDate: updatedRequestDates.endDate.toISO(),
      })
        .then(() => console.debug("refetching completed"))
        .catch((e) => console.error(e));
    }, oneMinuteInMillis);
    return () => clearInterval(timer);
  }, [refetch]);

  useEffect(() => {
    const sortMethod = getMarketSortingFunction(marketSort);
    const preparedMarkets: Market[] | null = data
      ? data.markets.result
          .map((market): Market => {
            const preparedSessions: MarketSession[] = market.sessions
              .map(
                (session): MarketSession => ({
                  ...session,
                  start: DateTime.fromISO(session.start),
                  end: DateTime.fromISO(session.end),
                })
              )
              .sort(
                (sessionA, sessionB) =>
                  sessionB.start.toMillis() - sessionA.start.toMillis()
              );

            const preparedTimeline: TimelineSegment[] = market.timeline.map(
              (segment) => ({
                ...segment,
                startDate: DateTime.fromISO(segment.startDate),
              })
            );

            return {
              ...market,
              sessions: preparedSessions,
              timeline: preparedTimeline,
            };
          })
          .sort((a, b) => sortMethod<Market>(a, b))
      : null;
    setMarkets(preparedMarkets);
  }, [data, selectedMarkets, marketSort]);

  return { markets, loading, networkStatus, error };
};

export const TimelinesView: React.FunctionComponent = () => {
  const [selectedMarkets] = useUserSetting<string[]>(
    SettingKey.MarketSelection
  );
  const [marketSort] = useUserSetting(SettingKey.MarketSort);
  const { markets } = useMarketsData(selectedMarkets, marketSort);

  return <TimelinesContainer markets={markets} />;
};
