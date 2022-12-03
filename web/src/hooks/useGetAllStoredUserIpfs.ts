import { useGetStoredUserIpfs } from "./useGetStoredUserIpfs";

export const useGetAllStoredUserIpfs = (count: number, user: string) => {
  const { data, loading } = useGetStoredUserIpfs("mumbai", count, user);

  return [data, loading];
};
