import { gql } from "@apollo/client";

export const MARKETS = gql`
  query Markets(
    $selection: [ID!]
    $sort: MarketSortingMethod
    $limit: Int!
    $page: Int!
    $sessionStartDate: String!
    $sessionEndDate: String!
    $withSessions: Boolean = true
    $timelineStartDate: String!
    $timelineEndDate: String!
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
        sessions(startDate: $sessionStartDate, endDate: $sessionEndDate)
          @include(if: $withSessions) {
          start
          end
          mainStatus
          status
        }
        timeline(startDate: $timelineStartDate, endDate: $timelineEndDate)
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
