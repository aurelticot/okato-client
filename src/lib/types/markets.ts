import { MarketStatus } from "./globalTypes";

export interface Market {
  id: string;
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
  start: Date;
  end: Date;
  mainStatus: MarketStatus;
  status: MarketStatus;
}
