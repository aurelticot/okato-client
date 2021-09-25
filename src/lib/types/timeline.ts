import { DateTime } from "luxon";
import { MarketStatus } from "./globalTypes";

export interface TimelineSegment {
  startDate: DateTime;
  start: number;
  duration: number;
  status: MarketStatus;
}
