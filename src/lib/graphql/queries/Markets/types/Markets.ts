/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarketSort } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Markets
// ====================================================

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
}
