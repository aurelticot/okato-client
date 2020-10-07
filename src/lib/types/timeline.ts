import { MarketStatus } from "./globalTypes";

export interface TimelineSegment {
  start: number;
  duration: number;
  status: MarketStatus;
}
