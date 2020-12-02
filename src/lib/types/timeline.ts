import { MarketStatus } from "./globalTypes";

export interface TimelineSegment {
  startDate: Date;
  endDate: Date;
  start: number;
  duration: number;
  status: MarketStatus;
}
