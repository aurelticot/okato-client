import React from "react";
import { DateTime } from "luxon";
import { config } from "../../config";
import { Market, MarketSession, SettingKey } from "lib/types";
import { dateFormat } from "lib/constants";
import {
  getMarketSortingFunction,
  fillBlankWithClosedSessions,
} from "lib/utils";
import { useUserSetting } from "lib/hooks";
import { TimelinesContainer } from "./components";
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
} = config;

const requestedStartDate = DateTime.local().minus({
  days: daysRequestedInPast,
  hours: timelineVisiblePeriod / 2,
});
const requestedEndDate = DateTime.local().plus({
  days: daysRequestedInFuture,
  hours: timelineVisiblePeriod / 2,
});

const PAGE_LIMIT = 20;

export const TimelineView: React.FunctionComponent = () => {
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
      startDate: requestedStartDate.toFormat(dateFormat),
      endDate: requestedEndDate.toFormat(dateFormat),
      withSessions: true,
    },
  });

  React.useEffect(() => {
    const sortMethod = getMarketSortingFunction(marketSort);
    const preparedMarkets: Market[] | null = data
      ? data.markets.result
          .filter((market) => {
            return selectedMarkets.includes(market.id) ? true : false;
          })
          .map(
            (market): Market => {
              const { timezone } = market;
              const preparedSessions: MarketSession[] = market.sessions
                .map(
                  (session): MarketSession => ({
                    start: DateTime.fromISO(
                      `${session.date}T${session.startTime}`,
                      { zone: timezone }
                    )
                      .startOf("minute")
                      .toJSDate(),
                    end: DateTime.fromISO(
                      `${session.date}T${session.endTime}`,
                      { zone: timezone }
                    )
                      .startOf("minute")
                      .toJSDate(),
                    mainStatus: session.mainStatus,
                    status: session.status,
                  })
                )
                .sort(
                  (sessionA, sessionB) =>
                    sessionB.start.getTime() - sessionA.start.getTime()
                );
              return {
                ...market,
                sessions: preparedSessions,
              };
            }
          )
          .map((market) => {
            const { sessions } = market;
            const preparedSessions = fillBlankWithClosedSessions(
              sessions,
              requestedStartDate.toJSDate(),
              requestedEndDate.toJSDate()
            );
            return { ...market, sessions: preparedSessions };
          })
          .sort((a, b) => sortMethod<Market>(a, b))
      : null;
    setMarkets(preparedMarkets);
  }, [data, selectedMarkets, marketSort]);

  return <TimelinesContainer markets={markets} />;
};
