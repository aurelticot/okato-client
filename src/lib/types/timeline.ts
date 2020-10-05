import { MarketStatus } from "./markets";

export interface TimelineSegment {
  start: number;
  duration: number;
  status: MarketStatus;
}
