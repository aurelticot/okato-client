import React from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { config } from "../config";
import { Market, SettingKey } from "../lib/types";
import {
  getMarketSortingFunction,
  getMarketSortingMethodByString,
} from "../lib/utils";
import { getMarketData } from "../lib/utils/APImock";
import { useUserSetting, useBaseTime } from "../lib/hooks";
import { TimelineTime, TimelineItem, TimelineRuler } from "../components";

const timelineTotalDays = config.daysInFuture + config.daysInPast + 1;
const timelineTotalSizeInSeconds = timelineTotalDays * 24 * 60 * 60;

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "56px",
    position: "relative",
  },
  container: {
    width: "100%",
    overflow: "auto",
  },
  timelines: {
    width: `${timelineTotalDays * 100}%`,
  },
}));

export const TimelineView = () => {
  const [selectedMarkets] = useUserSetting(SettingKey.MarketSelection);
  const [marketSort] = useUserSetting(SettingKey.MarketSort);
  const [markets, setMarkets] = React.useState<Market[]>([]);
  const sortMethod = getMarketSortingFunction(
    getMarketSortingMethodByString(marketSort)
  );

  React.useEffect(() => {
    getMarketData().then((marketsData) => {
      setMarkets(
        marketsData.filter((market) => {
          return selectedMarkets.includes(market.code) ? true : false;
        })
      );
    });
  }, [selectedMarkets]);

  const [time, setTime] = useBaseTime();
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
          {[...markets].sort(sortMethod).map((market) => {
            return (
              <TimelineItem key={market.code} time={time} market={market} />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
