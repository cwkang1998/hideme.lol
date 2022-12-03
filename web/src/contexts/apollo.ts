import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { createContext } from "react";

import networkSubgraph from "../networkSubgraph.json";

export class ApolloTheGraphClient {
  private clients: Map<string, ApolloClient<any>> = new Map();
  constructor() {
    Object.keys(networkSubgraph).forEach((key: string) => {
      this.clients.set(
        key,
        new ApolloClient({
          uri: "https://api.thegraph.com/subgraphs/name/chee-chyuan/hideme-subgraph",
          cache: new InMemoryCache(),
        })
      );
    });
  }

  public getNetworkGraphClient<T>(networkName: string): ApolloClient<T> {
    if (!this.clients.has(networkName)) {
      throw new Error("not found");
    }
    return this.clients.get(networkName) as ApolloClient<T>;
  }
}

export const ApolloTheGraphClientContext = createContext<ApolloTheGraphClient>(
  new ApolloTheGraphClient()
);
