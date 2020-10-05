import { gql } from "apollo-boost";

export const MARKETS = gql`
  query Markets(
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
