import { MarketStatus } from "./globalTypes";

export interface Market {
  id: string;
  mic: string;
  shortName: string;
  name: string;
  city: string;
  country: string;
  longitude: number;
  capitalisation: number | null;
  timezone: string;
  sessions: MarketSession[];
}

export interface MarketSession {
  start: Date;
  end: Date;
  mainStatus: MarketStatus;
  status: MarketStatus;
  reason?: string;
}
