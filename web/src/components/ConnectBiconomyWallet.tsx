import { Button } from "@chakra-ui/react";

export const ConnectBiconomyWallet = ({address, onButtonClick}: {address: string, onButtonClick: () => void}) => {


  return (
    <Button onClick={onButtonClick}>
      {!address ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
};
