import { gql } from "@apollo/client";

export const MARKETS_WITH_SESSIONS = gql`
  query MarketsWithSessions(
    $sort: MarketSort!
    $limit: Int!
    $page: Int!
    $startDate: String!
    $endDate: String!
  ) {
    markets(sort: $sort, limit: $limit, page: $page) {
      total
      result {
        id
        code
        name
        city
        country
        longitude
        timezone
        capitalisation
        sessions(startDate: $startDate, endDate: $endDate) {
          date
          startTime
          endTime
          mainStatus
          status
        }
      }
    }
  }
`;

export const MARKETS = gql`
  query Markets($sort: MarketSort!, $limit: Int!, $page: Int!) {
    markets(sort: $sort, limit: $limit, page: $page) {
      total
      result {
        id
        code
        name
        city
        country
        longitude
        timezone
        capitalisation
      }
    }
  }
`;
