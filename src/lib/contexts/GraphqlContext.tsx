import React from "react";
import { config } from "config";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: config.graphqlAPIEndpoint,
  cache: new InMemoryCache(),
});

export const GraphqlProvider: React.FunctionComponent = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
