import type { Remote } from "comlink";
import type { HideMeClient } from "./hideme.worker";

export type HideMeProps = {
  wasmWorkerApi: Remote<HideMeClient>;
};

export type RowData = {
  rowTitles: string[];
  rowValues: string[];
};

export type ProofData = {
  entityAddress: string;
  address: string;
  certName: string;
  certHash: string;
  selectedRows: {
    selectedKey: string;
    selectedValue: string;
    proof: number[];
  }[];
};