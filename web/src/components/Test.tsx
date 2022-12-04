import { useGetAllStoredUserIpfs } from "../hooks/useGetAllStoredUserIpfs";

export const Test = () => {
  const { data, loading } = useGetAllStoredUserIpfs(
    10,
    "0x5261ad65cec0708D0E485507C12F8aEA7218763f"
  );

  if (!loading) {
    console.log(JSON.stringify(data));
  }

  return <></>;
};
