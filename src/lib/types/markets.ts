export interface Market {
  code: string;
  name: string;
  city: string;
  longitude: number;
  capitalisation: number;
  timezone: string;
  hasReminder: boolean;
  isBookmarked: boolean;
  sessions: MarketSession[];
}

export interface MarketSession {
  startTime: Date;
  endTime: Date;
  status: MarketStatus;
}

export enum MarketStatus {
  Opened = "open",
  Closed = "close",
  ClosedSpecial = "close_special",
  Break = "break",
  BeforeMarket = "before_market",
  AfterMarket = "after_market",
}

export enum MarketSortingMethod {
  Capitalisation = "capitalisation",
  CapitalisationReverse = "capitalisation-reverse",
  Alphabetically = "alphabetically",
  AlphabeticallyReverse = "alphabetically-reverse",
  Chronologically = "chronologically",
  ChronologicallyReverse = "chronologically-reverse",
}
