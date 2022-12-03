import { ChangeEvent } from "react";

export const exportProofJson = (
  address: String,
  selectedRowTitle: string,
  selectedRowContent: string,
  proof: string
) => {
  const jsonObject = {
    address: address,
    selectedRowTitle: selectedRowTitle,
    selectedRowContent: selectedRowContent,
    proof: proof,
  };

  let proofFile = new Blob([JSON.stringify(jsonObject)], {
    type: "application/json",
  });
};
