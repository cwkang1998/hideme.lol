import { Box, Button, HStack, useToast } from "@chakra-ui/react";
import { isAddress } from "ethers/lib/utils.js";
import { useState } from "react";
import { useAccount } from "wagmi";
import type { HideMeProps, RowData } from "../hideme-types";
import { HideMe__factory } from "../typechain-types";
import { FlexibleFormTable } from "./FlexibleFormTable";

export const EntityForm = ({ wasmWorkerApi }: HideMeProps) => {
  const { address, connector } = useAccount();

  const [certTitle, setCertTitle] = useState<string>("");
  const [targetAddress, setTargetAddress] = useState<string>("");
  const [rows, setRows] = useState<RowData>({ rowTitles: [], rowValues: [] });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Creating...");

  const toast = useToast();

  const formOnChange = ({ rowTitles, rowValues }: RowData) => {
    setRows({ rowTitles, rowValues });
  };

  const onCreate = async () => {
    setIsLoading(true);
    if (
      targetAddress &&
      targetAddress?.length > 0 &&
      isAddress(targetAddress) &&
      rows.rowTitles.length > 1 &&
      rows.rowValues.length > 1 &&
      rows.rowTitles.length === rows.rowValues.length
    ) {
      try {
        setLoadingMessage("Creating commitment...");
        // Hack for filling up to 10 inputs
        let submitRowTitles = [...rows.rowTitles];
        let submitRowValues = [...rows.rowValues];
        if (rows.rowTitles.length !== 10 && rows.rowValues.length !== 10) {
          const fillUpLength = 10 - rows.rowTitles.length;
          submitRowTitles = [
            ...submitRowTitles,
            ...new Array(fillUpLength).fill("-"),
          ];
          submitRowValues = [
            ...submitRowValues,
            ...new Array(fillUpLength).fill("-"),
          ];
        }
        console.log("submitRowTitles: ", submitRowTitles);
        console.log("submitRowValues: ", submitRowValues);
        const commitment = await wasmWorkerApi.getFileCommitment(
          submitRowTitles,
          submitRowValues
        );

        setLoadingMessage("Submitting commitment...");
        console.log(commitment);
        await submitCommitment(targetAddress, commitment);

        setLoadingMessage("Exporting certificate...");

        setIsLoading(false);
        return toast({
          title: "Successful",
          status: "success",
          isClosable: true,
        });
      } catch (err: any) {
        setIsLoading(false);

        return toast({
          title: "Create error",
          description: err.message,
          status: "error",
          isClosable: true,
        });
      }
    }

    setIsLoading(false);

    return toast({
      title: "Create error",
      description:
        "Please make sure all fields are filled in completely, or that there are at least 2 rows of data.",
      status: "error",
      isClosable: true,
    });
  };

  const submitCommitment = async (
    targetAddress: string,
    commitment: string
  ) => {
    const signer = await connector?.getSigner({
      chainId: await connector.getChainId(),
    });
    if (!address || !signer) {
      throw new Error("Signer not available.");
    }
    const contract = HideMe__factory.connect(
      process.env.REACT_APP_PUBLIC_CONTRACT_ADDRESS!,
      signer
    );
    const tx = await contract.commitFileHash(targetAddress, commitment);
    return tx.wait();
  };

  return (
    <Box style={{ marginTop: "60px" }}>
      <div>
        <p className="inputTitle">Certificate Title</p>
        <input
          type="text"
          className="inputBox inputBoxCertTitle"
          placeholder="A certificate title"
          value={certTitle}
          onChange={(e: any) => setCertTitle(e.target.value)}
        />
      </div>
      <div className="formRows">
        <FlexibleFormTable onChange={formOnChange} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <p className="inputTitle">Target User Address</p>
        <HStack justify="space-between">
          <input
            type="text"
            className="inputBox inputBoxCertTitle"
            placeholder="target address"
            value={targetAddress}
            onChange={(e: any) => setTargetAddress(e.target.value)}
          />
        </HStack>
        <Button
          style={{ marginTop: "30px" }}
          className="buttonBase"
          onClick={onCreate}
        >
          Create Certificate
        </Button>
      </div>
    </Box>
  );
};
