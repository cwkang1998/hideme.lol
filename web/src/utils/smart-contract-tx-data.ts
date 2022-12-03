import { HideMe__factory } from "../typechain-types";

export const generateStoreUserCIDTransaction = (
  user: string,
  fileTypeString: string,
  cid: string
): string => {
  const hideMeInterface = HideMe__factory.createInterface();
  const data = hideMeInterface.encodeFunctionData("storeUserCID", [
    user,
    cid,
    fileTypeString,
  ]);

  return data;
};

export const generateCommitFileHash = (user: string, hash: string) => {
  const hideMeInterface = HideMe__factory.createInterface();
  const data = hideMeInterface.encodeFunctionData("commitFileHash", [
    user,
    hash,
  ]);

  return data;
};
