import { Button, Flex, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CollapsibleCard } from "../components/cards/CollapsibleCard";
import { Hero } from "../components/Hero";
import { MultiRowSelectTable } from "../components/MultiRowSelectTable";
import { SectionTitle } from "../components/SectionTitle";
import { HideMeProps, ProofData } from "../hideme-types";
import { useGetAllStoredUserIpfs } from "../hooks/useGetAllStoredUserIpfs";
import { readRowsFromIpfs } from "../utils/ipfs";
import { exportProofJson } from "../utils/json-import-export";
import SendPushNotification from "../utils/PushProtocol";

type UserFormData = {
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
};

export const Dashboard = ({ wasmWorkerApi }: HideMeProps) => {
  const toast = useToast();
  const [selectedRows, setSelectedRows] = useState<Record<string, number[]>>(
    {}
  );
  const [userFormData, setUserFormData] = useState<UserFormData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onMultiSelectTableChange = (id: string) => {
    return (vals: (string | number)[]) =>
      setSelectedRows((prevVal) => ({
        ...prevVal,
        [id]: vals.map((val) => parseInt(String(val))),
      }));
  };

  const generateProof = async (
    rowTitles: string[],
    rowValues: string[],
    selected: number
  ): Promise<number[]> => {
    // Hack for filling up to 10 inputs
    let submitRowTitles = [...rowTitles];
    let submitRowValues = [...rowValues];
    if (rowTitles.length !== 10 && rowValues.length !== 10) {
      const fillUpLength = 10 - rowTitles.length;
      submitRowTitles = [
        ...submitRowTitles,
        ...new Array(fillUpLength).fill("-"),
      ];
      submitRowValues = [
        ...submitRowValues,
        ...new Array(fillUpLength).fill("-"),
      ];
    }

    return wasmWorkerApi.getProof(submitRowTitles, submitRowValues, selected);
  };

  const onGenerateProofClicked = async () => {
    setIsLoading(true);
    if (!address) {
      return toast({
        title: "Wallet not connected",
        description: "Address cannot be found because wallet is not connected.",
        status: "error",
        isClosable: true,
      });
    }

    try {
      const data: ProofData[] = await Promise.all(
        Object.keys(selectedRows).map(async (key) => {
          const userFormDataDetails = userFormData.find(
            (userFormDataEle) => userFormDataEle.id === key
          );
          const proofs = await Promise.all(
            selectedRows[key].map(async (rowEle) => ({
              selectedKey: userFormDataDetails!.rowData.row[rowEle],
              selectedValue: userFormDataDetails!.rowData.values[rowEle],
              proof: await generateProof(
                userFormDataDetails!.rowData.row,
                userFormDataDetails!.rowData.values,
                rowEle
              ),
            }))
          );
          return {
            entityAddress: "0x00",
            address: address,
            certName: userFormDataDetails!.fileTypeString,
            certHash: userFormDataDetails!.fileType,
            selectedRows: proofs,
          };
        })
      );

      exportProofJson(data);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      return toast({
        title: "Proof geenration failed",
        description: `Failed to generate proof: ${err.message}`,
        status: "error",
        isClosable: true,
      });
    }
  };

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
              {userFormData.length > 0 &&
                userFormData.map((data) => (
                  <CollapsibleCard
                    address={data.user}
                    date={new Date(data.blockTimestamp)}
                    title={data.fileTypeString}
                  >
                    <MultiRowSelectTable
                      onChange={onMultiSelectTableChange(data.id)}
                      selectedRows={selectedRows[data.id]}
                      rowTitles={data.rowData.row}
                      rowValues={data.rowData.values}
                    />
                  </CollapsibleCard>
                ))}
            </VStack>
            <Flex justifyContent="end" w="full">
              <Button className="buttonBase" onClick={onGenerateProofClicked}>
                generate proof
              </Button>
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
