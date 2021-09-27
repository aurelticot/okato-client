import React from "react";
import { DateTime } from "luxon";
import { config } from "../../config";
import { Market, MarketSession, TimelineSegment, SettingKey } from "lib/types";
import { dateFormat } from "lib/constants";
import { getMarketSortingFunction } from "lib/utils";
import { useUserSetting } from "lib/hooks";
import { TimelinesContainer } from "components/organisms";
import { useQuery } from "@apollo/client";
import { MARKETS } from "lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "lib/graphql/queries/Markets/types/Markets";

const {
  timelineVisiblePeriod,
  daysRequestedInFuture,
  daysRequestedInPast,
  daysInPast,
  daysInFuture,
} = config;

const requestedStartDate = DateTime.local()
  .minus({
    days: daysRequestedInPast,
    hours: timelineVisiblePeriod / 2,
  })
  .startOf("day");
const requestedEndDate = DateTime.local()
  .plus({
    days: daysRequestedInFuture,
    hours: timelineVisiblePeriod / 2,
  })
  .endOf("day");
const requestedTimelineStartDate = DateTime.local().minus({
  days: daysInPast,
  hours: timelineVisiblePeriod / 2,
});
const requestedTimelineEndDate = DateTime.local().plus({
  days: daysInFuture,
  hours: timelineVisiblePeriod / 2,
});

const PAGE_LIMIT = 20;

export const TimelinesView: React.FunctionComponent = () => {
  const [selectedMarkets] = useUserSetting<string[]>(
    SettingKey.MarketSelection
  );
  const [marketSort] = useUserSetting(SettingKey.MarketSort);
  const [markets, setMarkets] = React.useState<Market[] | null>(null);

  const { data } = useQuery<MarketsData, MarketsVariables>(MARKETS, {
    variables: {
      selection: selectedMarkets,
      limit: PAGE_LIMIT,
      page: 1,
      sessionStartDate: requestedStartDate.toFormat(dateFormat),
      sessionEndDate: requestedEndDate.toFormat(dateFormat),
      withSessions: true,
      timelineStartDate: requestedTimelineStartDate.toISO(),
      timelineEndDate: requestedTimelineEndDate.toISO(),
      withTimeline: true,
    },
    pollInterval: 60000,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
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

  return <TimelinesContainer markets={markets} />;
};
