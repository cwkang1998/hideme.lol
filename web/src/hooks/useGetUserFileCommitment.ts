import { gql, useLazyQuery, useQuery } from "@apollo/client";

import { useCustomApolloClient } from "./useCustomApolloClient";

const GET_USER_FILE_COMMITMENT = gql`
  query getUserFileCommitment($fileTypeList: [Bytes]!, $user: Bytes!) {
    committedFiles(
      where: { fileType_in: $fileTypeList, user: $user }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      user
      fileType
      fileTypeString
      hash
      blockTimestamp
    }
  }
`;

export const useGetUserFileCommitment = (
  fileTypeList?: string[],
  user?: string
) => {
  const client = useCustomApolloClient("mumbai");

  const { data, loading, error, startPolling, stopPolling } = useQuery<{
    committedFiles: [
      {
        id: string;
        user: string;
        fileType: string;
        fileTypeString: string;
        hash: string;
        cid: string;
        blockTimestamp: string;
      }
    ];
  }>(GET_USER_FILE_COMMITMENT, {
    client,
    variables: {
      fileTypeList,
      user,
    },
  });
  return { loading, error, data, startPolling, stopPolling };
};
