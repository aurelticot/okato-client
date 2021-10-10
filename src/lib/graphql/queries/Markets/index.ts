import { gql } from "@apollo/client";

export const MARKETS = gql`
  query Markets(
    $selection: [ID!]
    $sort: MarketSortingMethod
    $limit: Int!
    $page: Int!
    $startDate: String!
    $endDate: String!
    $withSessions: Boolean = true
    $withTimeline: Boolean = true
  ) {
    markets(selection: $selection, sort: $sort, limit: $limit, page: $page) {
      total
      result {
        id
        mic
        shortName
        name
        city
        country
        longitude
        timezone
        capitalisation
        sessions(startDate: $startDate, endDate: $endDate)
          @include(if: $withSessions) {
          start
          end
          mainStatus
          status
        }
        timeline(startDate: $startDate, endDate: $endDate)
          @include(if: $withTimeline) {
          startDate
          start
          duration
          mainStatus
          status
        }
      }
    }
  }
`;
