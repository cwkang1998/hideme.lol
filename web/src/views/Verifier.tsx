import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useMultiStyleConfig,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Hero } from "../components/Hero";
import { SectionTitle } from "../components/SectionTitle";
import { HideMeProps, ProofData } from "../hideme-types";
import { useGetUserFileCommitment } from "../hooks/useGetUserFileCommitment";

export const Verifier = ({ wasmWorkerApi }: HideMeProps) => {
  const styles = useMultiStyleConfig("Button", { variant: "outline" });
  const toast = useToast();
  const { address, isConnected, connector } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [proofData, setProofData] = useState<ProofData[]>([]);
  const { data, loading, error } = useGetUserFileCommitment(
    proofData.map((val) => val.certHash),
    address
  );

  const uploadFile = async function (e: any) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const result = e?.target?.result;
      const jsonResult: ProofData[] = JSON.parse(result);
      setProofData(jsonResult);
      console.log(jsonResult);
    };
    reader.readAsText(e.target?.files[0]);
  };

  const onVerifyProof = async () => {
    setIsLoading(true);
    if (!address || !connector) {
      return toast({
        title: "Unable to get address or connector",
        description:
          "Unable to get address or connector. Please try to reconnect.",
        isClosable: true,
        status: "error",
      });
    }

    // handle graphql loading state
    if (proofData && proofData.length > 0) {
      const verificationResults = await Promise.all(
        proofData.map((p) => {
          const commitmentHash = data?.committedFiles.find(
            (commit) => commit.fileType === p.certHash
          )?.hash;
          return Promise.all(
            p.selectedRows.map((row) =>
              wasmWorkerApi.verifyProof(
                row.proof,
                row.selectedKey,
                row.selectedValue,
                commitmentHash
                  ? BigNumber.from(commitmentHash).toHexString()
                  : ""
              )
            )
          );
        })
      );

      console.log("verification?", verificationResults);

      const isVerified = verificationResults.every((valArr) =>
        valArr.every((val) => val)
      );

      setIsLoading(false);
      return toast({
        title: "Verification Result",
        description: `The proof is verified to be ${isVerified}.`,
        status: "success",
        isClosable: true,
      });
    }

    setIsLoading(false);
    return toast({
      title: "Invalid proof.json format",
      description: "The provided proof.json file is in an invalid format.",
      status: "error",
      isClosable: true,
    });
  };

  const renderRow = (row: any) => {
    return (
      <div className="proofCardRow">
        <div className="proofCardRowData">
          <div className="proofCardRowData_key">{row.selectedKey}</div>
          <div className="proofCardRowData_value">{row.selectedValue}</div>
        </div>
        <div className="proofCardRowData_proof">
          proof: {row.proof.join("").slice(0, 15)}...
        </div>
        <div className="proofCardDivider_small"></div>
      </div>
    );
  };

  const renderEntityProof = (proof: any) => {
    return (
      <div className="proofEntitySection">
        <h2 className="proofCardHeading">Certificate Name</h2>
        <div className="proofCardData">{proof.certName}</div>
        <div className="proofCardDivider"></div>
        <h2 className="proofCardHeading">Entity Address</h2>
        <div className="proofCardData">{proof.entityAddress}</div>
        <h2 className="proofCardHeading">Certificate Hash</h2>
        <div className="proofCardData">{proof.certHash}</div>
        <h2 className="proofCardHeading">Address</h2>
        <div className="proofCardData">{proof.address}</div>
        <div className="proofCardHeading">Selected Rows</div>
        <div className="proofCardDivider"></div>
        {proof.selectedRows.map(renderRow)}
      </div>
    );
  };
  console.log("proofData: ", proofData);

  return (
    <div style={{ width: "100%" }}>
      <Hero
        title="Verifier"
        subtitle="How it works"
        imageUrl="/assets/dashboard.png"
      >
        <Text textAlign="justify">
          Upload a proof to verify its authenticity.
        </Text>
      </Hero>
      <div className="page-container-outer">
        <div className="page-container">
          <Flex direction="column" padding={8}>
            <SectionTitle title="User Certificates" />
            <VStack marginTop={4}>
              <Box w="full" alignItems="start">
                <Input
                  type="file"
                  sx={{
                    padding: "10px",
                    height: "auto",
                    "::file-selector-button": {
                      border: "none",
                      outline: "none",
                      height: "auto",
                      mr: 2,
                      ...styles,
                    },
                  }}
                  onChange={uploadFile}
                  accept="application/json"
                  placeholder="Upload Proof"
                  className="baseButton"
                />
              </Box>
              <Box></Box>
            </VStack>
            <Flex w="full" direction="column">
              {proofData.length > 0 && (
                <div className="proofCard">
                  <h2 className="proofCardTitle">Proof</h2>
                  {proofData.map(renderEntityProof)}
                </div>
              )}
              <Flex justifyContent="end" w="full">
                <Button
                  className="buttonBase"
                  onClick={onVerifyProof}
                  isLoading={isLoading}
                >
                  verify
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};
