import { Box, Flex, Text } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import SendPushNotification from "../utils/PushProtocol";

export const Dashboard = () => {
  return (
    <Flex direction="column" w="full">
      <Hero
        title="User Dashboard"
        subtitle="How it works"
        imageUrl="/assets/dashboard.png"
      >
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
    </Flex>
      // <button
      //   onClick={() =>
      //     SendPushNotification("0x4bdB8234AD81F26985d257F36a2d2d8c30365546")
      //   }
      // >
      //   Hola
      // </button>
  );
};
