import React from "react";
import { DateTime } from "luxon";
import { config } from "../../config";
import { Market, MarketSession, SettingKey } from "../../lib/types";
import { dateFormat } from "../../lib/constants";
import {
  getMarketSortingFunction,
  fillBlankWithClosedSessions,
} from "../../lib/utils";
import { useUserSetting } from "../../lib/hooks";
import { TimelinesContainer } from "./components";
import { useQuery } from "@apollo/client";
import { MARKETS } from "../../lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
} from "../../lib/graphql/queries/Markets/types/Markets";

const {
  timelineVisiblePeriod,
  daysRequestedInFuture,
  daysRequestedInPast,
} = config;

const requestedStartDate = DateTime.local()
  .minus({ days: daysRequestedInPast, hours: timelineVisiblePeriod / 2 })
  .startOf("minute");
const requestedEndDate = DateTime.local()
  .plus({ days: daysRequestedInFuture, hours: timelineVisiblePeriod / 2 })
  .startOf("minute");

const PAGE_LIMIT = 10;

export const TimelineView: React.FunctionComponent<{}> = () => {
  const [selectedMarkets] = useUserSetting(SettingKey.MarketSelection);
  const [marketSort] = useUserSetting(SettingKey.MarketSort);
  const [markets, setMarkets] = React.useState<Market[]>([]);

  const { data } = useQuery<MarketsData, MarketsVariables>(MARKETS, {
    variables: {
      limit: PAGE_LIMIT,
      page: 1,
      startDate: requestedStartDate.toFormat(dateFormat),
      endDate: requestedEndDate.toFormat(dateFormat),
      withSessions: true,
    },
  });

  React.useEffect(() => {
    const sortMethod = getMarketSortingFunction(marketSort);
    const preparedMarkets: Market[] = data
      ? data.markets.result
          .filter((market) => {
            return selectedMarkets.includes(market.code) ? true : false;
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
                      .endOf("minute")
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
                hasReminder: false,
                isBookmarked: false,
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
      : [];
    setMarkets(preparedMarkets);
  }, [data, selectedMarkets, marketSort]);

  return <TimelinesContainer markets={markets} />;
};
