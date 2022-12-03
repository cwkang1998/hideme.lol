import { saveAs } from "file-saver";
import { ProofData } from "../hideme-types";

export const exportProofJson = (proofData: ProofData[]) => {
  const proofFile = new Blob([JSON.stringify(proofData)], {
    type: "application/json",
  });
  saveAs(proofFile, "proof.json");
};
