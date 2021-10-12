import React from "react";
import { styled } from "@mui/material/styles";
import {
  MarketStatus,
  TimelineSegment as TimelineSegmentType,
} from "lib/types";

const PREFIX = "TimelineSegment";

const classes = {
  statusOpen: `${PREFIX}-status-open`,
  statusBreak: `${PREFIX}-status-break`,
  statusClose: `${PREFIX}-status-close`,
  statusCloseSpecial: `${PREFIX}-status-close-special`,
  statusBeforeMarket: `${PREFIX}-status-before-market`,
  statusAfterMarket: `${PREFIX}-status-after-market`,
};

const StyledSegment = styled("div")(({ theme }) => ({
  [`&.${classes.statusOpen}`]: {
    background: theme.custom.palette.marketStatus.open.main,
    opacity: "100%",
  },
  [`&.${classes.statusBreak}`]: {
    background: theme.custom.palette.marketStatus.open.main,
    opacity: "100%",
    backgroundImage:
      "repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  [`&.${classes.statusClose}`]: {
    background: theme.custom.palette.marketStatus.close.main,
    opacity: "25%",
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  [`&.${classes.statusCloseSpecial}`]: {
    background: theme.custom.palette.marketStatus.close.main,
    opacity: "100%",
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,.2) 5px, rgba(255,255,255,.2) 10px)",
  },
  [`&.${classes.statusBeforeMarket}`]: {
    background: theme.custom.palette.marketStatus.other.main,
    opacity: "80%",
    backgroundImage:
      "repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  [`&.${classes.statusAfterMarket}`]: {
    background: theme.custom.palette.marketStatus.other.main,
    opacity: "80%",
    backgroundImage:
      "repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
}));

const getSegmentClass = (status: MarketStatus): string => {
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
  const segmentClass = getSegmentClass(status);
  return (
    <StyledSegment
      className={segmentClass}
      sx={{
        width: `${(duration * 100) / timelineSize}%`,
        left: `${(start * 100) / timelineSize}%`,
      }}
    />
  );
};

export const TimelineSegmentDefault: React.FunctionComponent = () => {
  return (
    <StyledSegment className={classes.statusClose} sx={{ width: "100%" }} />
  );
};
