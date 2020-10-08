import React from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { config } from "../../config";
import { SettingKey } from "../../lib/types";
import { dateFormat } from "../../lib/constants";
import { getMarketSortingFunction } from "../../lib/utils";
import { useUserSetting, useBaseTime } from "../../lib/hooks";
import { TimelineTime, TimelineItem, TimelineRuler } from "./components";
import { useQuery } from "@apollo/client";
import { MARKETS } from "../../lib/graphql/queries";
import {
  Markets as MarketsData,
  MarketsVariables,
  Markets_markets_result as Market,
} from "../../lib/graphql/queries/Markets/types/Markets";

const {
  daysInFuture,
  daysInPast,
  timelineVisiblePeriod,
  daysRequestedInFuture,
  daysRequestedInPast,
} = config;

const timelineTotalhours =
  (daysInFuture + daysInPast) * 24 + timelineVisiblePeriod;
const timelineTotalSizeInSeconds = timelineTotalhours * 60 * 60;

const useStyles = makeStyles((_theme) => ({
  root: {
    marginBottom: "56px",
    position: "relative",
  },
  container: {
    width: "100%",
    overflow: "auto",
  },
  timelines: {
    width: `${(timelineTotalhours * 100) / timelineVisiblePeriod}%`,
  },
}));

const PAGE_LIMIT = 10;

export const TimelineView = () => {
  const [selectedMarkets] = useUserSetting(SettingKey.MarketSelection);
  const [marketSort] = useUserSetting(SettingKey.MarketSort);
  const [time, setTime] = useBaseTime();
  const [markets, setMarkets] = React.useState<Market[]>([]);

  const { data } = useQuery<MarketsData, MarketsVariables>(MARKETS, {
    variables: {
      limit: PAGE_LIMIT,
      page: 1,
      startDate: DateTime.local()
        .minus({ days: daysRequestedInPast, hours: timelineVisiblePeriod / 2 })
        .startOf("minute")
        .toFormat(dateFormat),
      endDate: DateTime.local()
        .plus({ days: daysRequestedInFuture, hours: timelineVisiblePeriod / 2 })
        .minus({ minute: 1 })
        .endOf("minute")
        .toFormat(dateFormat),
      withSessions: true,
    },
  });

  React.useEffect(() => {
    const sortMethod = getMarketSortingFunction(marketSort);
    const preparedMarkets = data
      ? data.markets.result
          .filter((market) => {
            return selectedMarkets.includes(market.code) ? true : false;
          })
          .sort((a, b) => sortMethod<Market>(a, b))
      : [];
    setMarkets(preparedMarkets);
  }, [data, selectedMarkets, marketSort]);

  const containerRef = React.useRef<HTMLDivElement>();

  const handleScroll = React.useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement) {
      return;
    }
    const timelineSize = containerElement.scrollWidth;
    const middleTimelineViewport = containerElement.clientWidth / 2;
    const middleTimeline = timelineSize / 2;
    const timeDiff =
      containerElement.scrollLeft - middleTimeline + middleTimelineViewport;
    const timeDiffInSec =
      (timeDiff * timelineTotalSizeInSeconds) / timelineSize;
    if (Math.abs(timeDiffInSec) < 60) {
      return;
    }
    const now = DateTime.local();
    const targetTime = now.plus({ seconds: timeDiffInSec });
    setTime(targetTime.toJSDate());
  }, [setTime]);

  const handleBackToRealTime = React.useCallback(() => {
    setTime(null);
  }, [setTime]);

  const initialScroll = React.useRef(true);

  React.useLayoutEffect(() => {
    if (!initialScroll.current && time) {
      return;
    }
    initialScroll.current = false;
    const containerElement = containerRef.current;
    if (!containerElement) {
      return;
    }
    const timelineSize = containerElement.scrollWidth;
    const middleContainerViewport = containerElement.clientWidth / 2;
    const middleTimeline = timelineSize / 2;
    let timeDiff = 0;
    if (time) {
      const now = DateTime.fromJSDate(new Date());
      const targetTime = DateTime.fromJSDate(time);
      const timeDiffInSec = targetTime.diff(now).as("seconds");
      timeDiff = (timeDiffInSec * timelineSize) / timelineTotalSizeInSeconds;
    }
    containerElement.scrollLeft =
      middleTimeline + timeDiff - middleContainerViewport;
  }, [time]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <TimelineTime time={time} onClickBackToRealTime={handleBackToRealTime} />
      <Box
        className={classes.container}
        onScroll={handleScroll}
        {...{ ref: containerRef }}
      >
        <Box className={classes.timelines}>
          <TimelineRuler />
          {[...markets].map((market) => {
            return (
              <TimelineItem
                key={market.id}
                time={time}
                market={{ ...market, hasReminder: false, isBookmarked: false }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
