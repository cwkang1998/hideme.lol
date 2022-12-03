import { Button } from "@chakra-ui/react";
import { useSmartAccountContext } from "../contexts/SmartAccountContext";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";

export const ConnectBiconomyWallet = () => {
  const {
    address,
    loading: eoaLoading,
    userInfo,
    connect,
    disconnect,
    getUserInfo,
  } = useWeb3AuthContext();
  const {
    wallet,
    selectedAccount,
    loading: scwLoading,
    setSelectedAccount,
  } = useSmartAccountContext();

  const buttonOnClick = !address
    ? connect
    : () => {
        debugger;
        setSelectedAccount(null);
        disconnect();
      };

  return (
    <Button onClick={buttonOnClick}>
      {!address ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
};
