import { gql } from "@apollo/client";

export const MARKETS = gql`
  query Markets(
    $sort: MarketSortingMethod
    $limit: Int!
    $page: Int!
    $startDate: String!
    $endDate: String!
    $withSessions: Boolean = true
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
        sessions(startDate: $startDate, endDate: $endDate)
          @include(if: $withSessions) {
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
