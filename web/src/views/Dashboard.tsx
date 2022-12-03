import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CollapsibleCard } from "../components/cards/CollapsibleCard";
import { FlexibleFormTable } from "../components/FlexibleFormTable";
import { Hero } from "../components/Hero";
import { MultiRowSelectTable } from "../components/MultiRowSelectTable";
import { SectionTitle } from "../components/SectionTitle";
import { useGetAllStoredUserIpfs } from "../hooks/useGetAllStoredUserIpfs";
import { readRowsFromIpfs } from "../utils/ipfs";
import SendPushNotification from "../utils/PushProtocol";

export const Dashboard = () => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>(["0"]);
  const [userFormData, setUserFormData] = useState<
    {
      rowData: {
        row: string[];
        values: string[];
      };
      id: string;
      user: string;
      fileType: string;
      fileTypeString: string;
      cid: string;
      blockTimestamp: string;
    }[]
  >([]);

  const userAddress = "0x5261ad65cec0708D0E485507C12F8aEA7218763f";

  const { address } = useAccount();

  const { data, loading } = useGetAllStoredUserIpfs(100, address!);

  useEffect(() => {
    const asyncFn = async () => {
      if (!loading && data) {
        const ipfsRowData = await Promise.all(
          data.saveIpfsCids.map((item) => readRowsFromIpfs(item.cid))
        );

        const userFormData = data.saveIpfsCids.map((item, idx) => ({
          ...item,
          rowData: ipfsRowData[idx],
        }));

        setUserFormData(userFormData);
      }
    };
    asyncFn();
  }, [loading, data]);

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
            {/* <VStack marginTop={4}>
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
              </CollapsibleCard> */}

            {/* </VStack> */}
            {userFormData.length > 0 &&
              userFormData.map((data) => {
                return (
                  <VStack marginTop={4}>
                    <CollapsibleCard
                      address={userAddress}
                      date={new Date()}
                      title={data.fileTypeString}
                    >
                      <MultiRowSelectTable
                        onChange={(vals) => {
                          console.log(vals);
                          setSelectedRows(vals);
                        }}
                        selectedRows={selectedRows}
                        rowTitles={data.rowData.row}
                        rowValues={data.rowData.values}
                      />
                    </CollapsibleCard>
                  </VStack>
                );
              })}
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
