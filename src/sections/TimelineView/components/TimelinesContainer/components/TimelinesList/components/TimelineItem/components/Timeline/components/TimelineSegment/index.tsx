import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MarketStatus,
  TimelineSegment as TimelineSegmentType,
} from "lib/types";

const useMarketStatusStyles = makeStyles((theme) => ({
  statusOpen: {
    background: theme.palette.success.main,
    opacity: "100%",
  },
  statusBreak: {
    background: theme.palette.warning.light,
    opacity: "70%",
    backgroundImage:
      "repeating-linear-gradient(80deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  statusClose: {
    background: theme.palette.error.light,
    opacity: "15%",
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  statusCloseSpecial: {
    background: theme.palette.error.light,
    opacity: "40%",
  },
  statusBeforeMarket: {
    background: theme.palette.warning.light,
    opacity: "60%",
    backgroundImage:
      "repeating-linear-gradient(-75deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  statusAfterMarket: {
    background: theme.palette.warning.light,
    opacity: "60%",
    backgroundImage:
      "repeating-linear-gradient(-75deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
}));

const defineSegmentClass = (
  status: MarketStatus,
  classes: Record<string, string>
): string => {
  switch (status) {
    case MarketStatus.OPEN:
      return classes.statusOpen;
    case MarketStatus.BREAK:
      return classes.statusBreak;
    case MarketStatus.CLOSE:
      return classes.statusClose;
    case MarketStatus.CLOSE_SPECIAL:
      return classes.statusCloseSpecial;
    case MarketStatus.BEFORE_MARKET:
      return classes.statusBeforeMarket;
    case MarketStatus.AFTER_MARKET:
      return classes.statusAfterMarket;
    default:
      return classes.statusClose;
  }
};

interface Props {
  segment: TimelineSegmentType;
  timelineSize: number;
}

export const TimelineSegment: React.FunctionComponent<Props> = ({
  segment,
  timelineSize,
}) => {
  const { duration, start, status } = segment;
  const classes = useMarketStatusStyles();
  const segmentClass = defineSegmentClass(status, classes);
  return (
    <Box
      className={`${segmentClass}`}
      style={{
        width: `${(duration * 100) / timelineSize}%`,
        left: `${(start * 100) / timelineSize}%`,
      }}
    />
  );
};

export const TimelineSegmentDefault: React.FunctionComponent<{}> = () => {
  const classes = useMarketStatusStyles();
  return <Box className={`${classes.statusClose}`} style={{ width: "100%" }} />;
};
