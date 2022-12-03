import { Web3Storage } from "web3.storage";
import axios from "axios";

//returns the cid of the data uplaoded
export const submitFormToIpfs = async (key: string[], value: string[]) => {
  const rows = [key, value];

  const storage = new Web3Storage({
    token: process.env.REACT_APP_PUBLIC_WEB3_STORAGE_KEY!,
  });

  const blob = new Blob([JSON.stringify(rows)], { type: "application/json" });

  console.log("debugging : ", rows);

  const files = [
    new File([blob], "rows.json"),
  ];
  const cid = await storage.put(files);
  return cid;
};

export const readRowsFromIpfs = async (cid: String) => {
  let res = await axios.get<[string[], string[]]>(`https://${cid}.ipfs.w3s.link/rows.json`);
  return res.data;
};
