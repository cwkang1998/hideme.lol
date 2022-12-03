import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { useCustomApolloClient } from "./useCustomApolloClient";

const GET_STORED_USER_IPFS = gql`
  query getStoredUserIpfs($count: Int!, $user: Bytes!) {
    saveIpfsCids(
      first: $count
      where: { user: $user }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      user
      fileType
      fileTypeString
      cid
      blockTimestamp
    }
  }
`;

type SaveIpfsCidsResponse = {
  saveIpfsCids: Array<SaveIpfsCidsResponseItem>;
};

type SaveIpfsCidsResponseItem = {
  id: string;
  user: string;
  fileType: string;
  fileTypeString: string;
  cid: string;
  blockTimestamp: string;
};

export const useGetStoredUserIpfs = (
  networkName: string,
  count: number,
  user: string
) => {
  const client = useCustomApolloClient(networkName);

  const { loading, error, data, startPolling, stopPolling } = useQuery<SaveIpfsCidsResponse>(
    GET_STORED_USER_IPFS,
    {
      variables: { count, user },
      client,
    }
  );
  return { loading, error, data, startPolling, stopPolling };
};

export const useGetStoredUserIpfsPoll = (
  networkName: string,
  pollInterval: number,
  count: number,
  user: string
) => {
  const { loading, error, data, startPolling, stopPolling } =
    useGetStoredUserIpfs(networkName, count, user);

  useEffect(() => {
    startPolling(pollInterval);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling, pollInterval]);

  return { loading, error, data };
};
