/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarketSort, MarketMainStatus, MarketStatus } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: MarketsWithSessions
// ====================================================

export interface MarketsWithSessions_markets_result_sessions {
  __typename: "TradingSession";
  date: string;
  startTime: string;
  endTime: string;
  mainStatus: MarketMainStatus;
  status: MarketStatus;
}

export interface MarketsWithSessions_markets_result {
  __typename: "Market";
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  longitude: number;
  timezone: string;
  capitalisation: number | null;
  sessions: MarketsWithSessions_markets_result_sessions[];
}

export interface MarketsWithSessions_markets {
  __typename: "Markets";
  total: number;
  result: MarketsWithSessions_markets_result[];
}

export interface MarketsWithSessions {
  markets: MarketsWithSessions_markets;
}

export interface MarketsWithSessionsVariables {
  sort: MarketSort;
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
}
