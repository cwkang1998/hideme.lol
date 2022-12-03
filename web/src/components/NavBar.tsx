import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { PropsWithChildren } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { useSmartAccountContext } from "../contexts/SmartAccountContext";
import { ConnectBiconomyWallet } from "./ConnectBiconomyWallet";

const Links = ["Entity", "Dashboard", "Verifier"];

const NavLink = ({ children }: PropsWithChildren<{}>) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export const NavBar = ({children}: PropsWithChildren<{}>) => {
  const {
    address,
    loading: eoaLoading,
    userInfo,
    connect,
    disconnect,
    getUserInfo,
  } = useWeb3AuthContext();
  const {
    selectedAccount,
    loading: scwLoading,
    setSelectedAccount,
  } = useSmartAccountContext();

  const onButtonClick = () => {
    console.log(address);
    console.log(selectedAccount)
    if (!address) {
      connect();
    } else {
      setSelectedAccount(null);
      disconnect();
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ConnectBiconomyWallet address={address} onButtonClick={onButtonClick}/>
            <ConnectButton />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Flex>{children}</Flex>
    </>
  );
};
