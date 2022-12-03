import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { SectionTitle } from "../components/SectionTitle";

export const Verifier = () => {
  return (
    <Flex direction="column" style={{ width: "100%" }}>
      <Hero
        title="Verifier"
        subtitle="How it works"
        imageUrl="/assets/dashboard.png"
      >
        <Text textAlign="justify">
          Upload a proof to verify its authenticity.
        </Text>
      </Hero>
      <Flex direction="column" padding={8}>
        <SectionTitle title="User Certificates" />
        <VStack marginTop={4}>
          <Box w="full" alignItems="start">
            <Button>Upload Proof</Button>
          </Box>
          <Box></Box>
        </VStack>
      </Flex>
    </Flex>
  );
};
