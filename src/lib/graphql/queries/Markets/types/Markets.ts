/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  MarketSortingMethod,
  MarketStatus,
} from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Markets
// ====================================================

export interface Markets_markets_result_sessions {
  __typename: "MarketSession";
  start: string;
  end: string;
  mainStatus: MarketStatus;
  status: MarketStatus;
}

export interface Markets_markets_result_timeline {
  __typename: "TimelineSegment";
  startDate: string;
  start: number;
  duration: number;
  mainStatus: MarketStatus;
  status: MarketStatus;
}

export interface Markets_markets_result {
  __typename: "Market";
  id: string;
  mic: string;
  shortName: string;
  name: string;
  city: string;
  country: string;
  longitude: number;
  timezone: string;
  capitalisation: number | null;
  sessions: Markets_markets_result_sessions[];
  timeline: Markets_markets_result_timeline[];
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
  selection?: string[] | null;
  sort?: MarketSortingMethod | null;
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
  withSessions?: boolean | null;
  withTimeline?: boolean | null;
}
