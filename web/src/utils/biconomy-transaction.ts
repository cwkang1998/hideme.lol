import SmartAccount from "@biconomy/smart-account";

export const biconomyTransact = async (
  smartAccount: SmartAccount,
  data: string
) => {
  const contractAddr = process.env.REACT_APP_HIDEME_CONTRACT_ADDRESS!;
  const tx = {
    to: contractAddr,
    data,
  };

  const response = await smartAccount.sendGasLessTransaction({
    transaction: tx,
  });
  return response;
};
