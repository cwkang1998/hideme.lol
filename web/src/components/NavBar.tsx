import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image
} from "@chakra-ui/react";
import { ReactNode, PropsWithChildren } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Links = [{ title: "Entity", href: "/entity" }, { title: "Dashboard", href: "/dashboard" }, { title: "Verifier", href: "Verifier" }];

type NavLinkType = {
  title: string,
  href: string,
}
const NavLink = ({ href, title }: NavLinkType) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "underline",
    }}
    href={href}
  >
    {title}
  </Link>
);

export const NavBar = ({children}: PropsWithChildren<{}>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("primaryBlue", "primaryBlue")} className="navbar" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Image
              src="/assets/logo-white.svg"
              width="140px"
            />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ title, href }) => (
                <NavLink key={title} title={title} href={href} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ConnectButton />
          </Flex>
        </Flex>
      </Box>
      <Flex className="bg-gradient">
        {children}
      </Flex>
    </>
  );
};
