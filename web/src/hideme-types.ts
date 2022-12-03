import type { Remote } from "comlink";
import type { HideMeClient } from "./hideme.worker";

export type FileHasherProps = {
  wasmWorkerApi: Remote<HideMeClient>;
};

export type RowData = {
  rowTitles: string[];
  rowValues: string[];
};
