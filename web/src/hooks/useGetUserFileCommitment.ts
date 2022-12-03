import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { useCustomApolloClient } from "./useCustomApolloClient";

const GET_USER_FILE_COMMITMENT = gql`
  query getUserFileCommitment($count: Int!, $user: Bytes!) {
    committedFiles(
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

export const useGetUserFileCommitment = (count: number, user: string) => {
  const client = useCustomApolloClient("mumbai");

  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_USER_FILE_COMMITMENT,
    {
      variables: { count, user },
      client,
    }
  );
  return { loading, error, data, startPolling, stopPolling };
};
