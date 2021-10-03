import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Market, MarketSession, TimelineSegment, SettingKey } from "lib/types";
import { getMarketSortingFunction, getTimelineDates } from "lib/utils";
import { everyMinuteSchedule } from "lib/constants";
import { useScheduleJob, useUserSetting } from "lib/hooks";
import { TimelinesContainer } from "components/organisms";
import { useQuery } from "@apollo/client";
import { MARKETS } from "lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "lib/graphql/queries/Markets/types/Markets";

const initialTimelineDates = getTimelineDates();

const PAGE_LIMIT = 20;

const useMarketsData = (selectedMarkets: string[]) => {
  const { data, loading, networkStatus, error, refetch } = useQuery<
    MarketsData,
    MarketsVariables
  >(MARKETS, {
    variables: {
      selection: selectedMarkets,
      limit: PAGE_LIMIT,
      page: 1,
      startDate: initialTimelineDates.total.start.toISO(),
      endDate: initialTimelineDates.total.end.toISO(),
      withSessions: true,
      withTimeline: true,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  useScheduleJob(
    everyMinuteSchedule,
    () => {
      const updatedTimelineDates = getTimelineDates();
      refetch({
        startDate: updatedTimelineDates.total.start.toISO(),
        endDate: updatedTimelineDates.total.end.toISO(),
      })
        .then(() => {
          // Nothing to do here
        })
        .catch(() => {
          // TODO deal with the error
        });
    },
    [refetch]
  );

  return { data, loading, networkStatus, error };
};

export const TimelinesView: React.FunctionComponent = () => {
  const [selectedMarkets] = useUserSetting<string[]>(
    SettingKey.MarketSelection
  );
  const [marketSort] = useUserSetting(SettingKey.MarketSort);
  const [markets, setMarkets] = useState<Market[] | null>(null);
  const { data } = useMarketsData(selectedMarkets);

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

  return (
    <TimelinesContainer
      markets={markets}
      nbMarketsLoading={selectedMarkets.length}
    />
  );
};
