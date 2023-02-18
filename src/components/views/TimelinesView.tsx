import React, { useCallback, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Market, MarketSession, TimelineSegment, SettingKey } from "lib/types";
import { getMarketSortingFunction, getTimelineDates } from "lib/utils";
import { everyMinuteSchedule } from "lib/constants";
import { useBaseTime, useScheduleJob, useUserSetting } from "lib/hooks";
import { TimelinesContainer, TimelinesList } from "components/organisms";
import { useLazyQuery } from "@apollo/client";
import { MARKETS } from "lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "lib/graphql/queries/Markets/types/Markets";

const initialTimelineDates = getTimelineDates();

const PAGE_LIMIT = 20;

const useMarketsData = (selectedMarkets: string[]) => {
  const [getData, { data, loading, error, refetch }] = useLazyQuery<
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
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const updateMarkets = useCallback(() => {
    if (selectedMarkets.length < 1) {
      return;
    }
    const updatedTimelineDates = getTimelineDates();
    refetch &&
      refetch({
        startDate: updatedTimelineDates.total.start.toISO(),
        endDate: updatedTimelineDates.total.end.toISO(),
      })
        .then()
        .catch((error) => {
          // TODO: Handle error
        });
  }, [refetch, selectedMarkets]);

  useEffect(() => {
    if (selectedMarkets.length < 1) {
      return;
    }
    void getData();
  }, [getData, selectedMarkets]);

  useScheduleJob(everyMinuteSchedule, updateMarkets, [updateMarkets]);

  useEffect(() => {
    window.addEventListener("online", updateMarkets);
    return () => {
      window.removeEventListener("online", updateMarkets);
    };
  }, [updateMarkets]);

  return { data, loading, error };
};

export const TimelinesView: React.FunctionComponent = () => {
  const [selectedMarkets] = useUserSetting<string[]>(
    SettingKey.MarketSelection
  );
  const [marketSort] = useUserSetting(SettingKey.MarketSort);
  const [markets, setMarkets] = useState<Market[] | null>(null);
  const { data } = useMarketsData(selectedMarkets);
  const [baseTime, setBaseTime] = useBaseTime();

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
    <TimelinesContainer baseTime={baseTime} setBaseTime={setBaseTime}>
      <TimelinesList
        markets={selectedMarkets.length === 0 ? [] : markets}
        baseTime={baseTime}
        nbMarketsLoading={selectedMarkets.length}
      />
    </TimelinesContainer>
  );
};
