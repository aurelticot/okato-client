/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarketSort, MarketMainStatus, MarketStatus } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Markets
// ====================================================

export interface Markets_markets_result_sessions {
  __typename: "TradingSession";
  date: string;
  startTime: string;
  endTime: string;
  mainStatus: MarketMainStatus;
  status: MarketStatus;
}

export interface Markets_markets_result {
  __typename: "Market";
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  longitude: number;
  timezone: string;
  capitalisation: number | null;
  sessions: Markets_markets_result_sessions[];
}

export interface Markets_markets {
  __typename: "Markets";
  total: number;
  result: Markets_markets_result[];
}

export interface Markets {
  markets: Markets_markets;
}

export interface MarketsVariables {
  sort: MarketSort;
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
}
