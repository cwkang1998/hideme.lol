import { Box, Button, Card, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { SectionTitle } from "../components/SectionTitle";

export const Verifier = () => {
  return (
    <Flex direction="column">
      <Hero title="User Dashboard" subtitle="How it works" imageUrl="/250.png">
        <Text textAlign="justify">
          This is the place for uploading your certificates and generating
          proofs.
        </Text>
        <br />
        <Text textAlign="justify">
          Each of the uploaded certificate displays a list of key and value
          pairs. Select which rows you would like to reveal and generate a
          proof.
        </Text>
      </Hero>
      <Flex direction="column" padding={8}>
        <SectionTitle title="User Certificates"/>
        <VStack marginTop={4}>
          <Box w="full" alignItems="start"><Button>Upload Proof</Button></Box>
          <Box></Box>
        </VStack>
      </Flex>
    </Flex>
  );
};
