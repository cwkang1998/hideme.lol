import { Box, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { FlexibleFormTable } from "./FlexibleFormTable";

const DEFAULT_ROW = [{}];

const NewRow = () => {
  return <div className="formRow"></div>;
};
export const EntityForm = ({}) => {
  const [certTitle, setCertTitle] = useState<string>("");
  const [targetAddress, setTargetAddress] = useState<string>("");
  const [rows, setRows] = useState<any>([...DEFAULT_ROW]);

  const renderRow = (row: any) => {};
  const formOnChange = (d: any) => {
    console.log("formOnChange", d);
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
        {rows.map(renderRow)}
        <NewRow />
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
        <Button style={{ marginTop: "30px" }} className="buttonBase">
          Create Certificate
        </Button>
      </div>
    </Box>
  );
};
