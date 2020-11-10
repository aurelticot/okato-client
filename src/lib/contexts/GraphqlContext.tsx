import React, { PropsWithChildren } from "react";
import { config } from "config";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: config.graphqlAPIEndpoint,
  cache: new InMemoryCache(),
});

export const GraphqlProvider = ({ children }: PropsWithChildren<{}>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
