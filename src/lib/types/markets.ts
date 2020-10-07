import { MarketStatus } from "./globalTypes";

export interface Market {
  code: string;
  name: string;
  city: string;
  longitude: number;
  capitalisation: number | null;
  timezone: string;
  hasReminder: boolean;
  isBookmarked: boolean;
  sessions: MarketSession[];
}

export interface MarketSession {
  date: string;
  startTime: string;
  endTime: string;
  mainStatus: MarketStatus;
  status: MarketStatus;
}
