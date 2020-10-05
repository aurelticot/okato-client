import { gql } from "@apollo/client";

export const MARKET = gql`
  query Market($id: ID!, $startDate: String!, $endDate: String!) {
    market(id: $id) {
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
`;
