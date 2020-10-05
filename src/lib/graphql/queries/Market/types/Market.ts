/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarketMainStatus, MarketStatus } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Market
// ====================================================

export interface Market_market_sessions {
  __typename: "TradingSession";
  date: string;
  startTime: string;
  endTime: string;
  mainStatus: MarketMainStatus;
  status: MarketStatus;
}

export interface Market_market {
  __typename: "Market";
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  longitude: number;
  timezone: string;
  capitalisation: number | null;
  sessions: Market_market_sessions[];
}

export interface Market {
  market: Market_market;
}

export interface MarketVariables {
  id: string;
  startDate: string;
  endDate: string;
}
