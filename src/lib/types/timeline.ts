import { MarketStatus } from "./globalTypes";

export interface TimelineSegment {
  startDate: Date;
  start: number;
  duration: number;
  status: MarketStatus;
}
