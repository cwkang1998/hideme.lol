import {
  Box,
  Flex,
  Input,
  Text,
  useMultiStyleConfig,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Hero } from "../components/Hero";
import { SectionTitle } from "../components/SectionTitle";
import { HideMeProps } from "../hideme-types";
import { HideMe__factory } from "../typechain-types";

type ProofData = {
  entityAddress: string;
  address: string;
  certName: string;
  certHash: string;
  selectedRows: {
    selectedKey: string;
    selectedValue: string;
    proof: Uint32Array;
  }[];
};

export const Verifier = ({ wasmWorkerApi }: HideMeProps) => {
  const styles = useMultiStyleConfig("Button", { variant: "outline" });
  const toast = useToast();
  const { address, isConnected, connector } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [proofData, setProofData] = useState<ProofData[]>([]);

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

    const contract = HideMe__factory.connect(
      process.env.REACT_APP_PUBLIC_CONTRACT_ADDRESS!,
      await connector.getSigner()
    );

    const ringBuffer = [0, 1, 2, 3, 4];

    const nextIndex = await contract.ringBufferIndexes(address);

    const currIndex = ringBuffer[nextIndex - 1] ?? 4;

    const commitmentHash = await contract.fileHashRingBuffers(
      address,
      currIndex
    );

    if (proofData && proofData.length > 0) {
      const verificationResults = await Promise.all(
        proofData.map((p) =>
          Promise.all(
            p.selectedRows.map((row) =>
              wasmWorkerApi.verifyProof(
                row.proof,
                row.selectedKey,
                row.selectedValue,
                commitmentHash.toHexString()
              )
            )
          )
        )
      );

      const isVerified = verificationResults.every((valArr) => valArr.every((val) => val));

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
            />
          </Box>
          <Box></Box>
        </VStack>
      </Flex>
    </Flex>
  );
};
