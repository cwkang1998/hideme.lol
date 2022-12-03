import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { CollapsibleCard } from "../components/cards/CollapsibleCard";
import { FlexibleFormTable } from "../components/FlexibleFormTable";
import { Hero } from "../components/Hero";
import { MultiRowSelectTable } from "../components/MultiRowSelectTable";
import { SectionTitle } from "../components/SectionTitle";
import SendPushNotification from "../utils/PushProtocol";

export const Dashboard = () => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>(["0"]);

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

      <div className="page-container-outer">
        <div className="page-container">
          <Flex direction="column" padding={8}>
            <SectionTitle title="User Certificates" />
            <VStack marginTop={4}>
              <CollapsibleCard
                address="0x123123123"
                date={new Date()}
                title="University"
              >
                <MultiRowSelectTable
                  onChange={(vals) => {
                    console.log(vals);
                    setSelectedRows(vals);
                  }}
                  selectedRows={selectedRows}
                  rowTitles={["123", "234", "345"]}
                  rowValues={["s1", "s3", "s66"]}
                />
              </CollapsibleCard>
            </VStack>
            <Flex justifyContent="end" w="full">
              <Button className="buttonBase">generate proof</Button>
            </Flex>
          </Flex>
        </div>
      </div>
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
