import { expose } from "comlink";
import { sha256 } from "js-sha256";
import init, {
  generate_proof,
  get_file_commitment_and_selected_row,
  get_selected_row,
  initThreadPool,
  verify_correct_selector,
} from "file-hasher";
import {
  convertSha256HexToU32,
  convertStringToU32,
} from "./utils/sha256-conversion";

export class FileHasher {
  public isInitialized: boolean = false;

  async initialize() {
    if (!this.isInitialized) {
      await init();
      await initThreadPool(navigator.hardwareConcurrency);
      this.isInitialized = true;
    }
  }

  async getFileCommitment(
    rowTitles: string[],
    rowContent: string[]
  ): Promise<string> {
    const rowTitlesU32 = rowTitles.map((x) => {
      return convertStringToU32(x);
    });
    const rowContentU32 = rowContent.map((x) => {
      return convertStringToU32(x);
    });

    const selectedRowIndex = 0;
    const rowSelector = Array(rowTitles.length).fill(0);
    rowSelector[selectedRowIndex] = 1;

    const [fileCommitmentHex] = get_file_commitment_and_selected_row(
      rowTitlesU32,
      rowContentU32,
      rowSelector
    );

    return fileCommitmentHex;
  }

  async getProof(rowTitles: string[], rowContent: string[], index: number) {
    const rowTitlesU32 = rowTitles.map((x) => {
      const shaRes = sha256(x);
      return convertSha256HexToU32(shaRes);
    });
    const rowContentU32 = rowContent.map((x) => {
      const shaRes = sha256(x);
      return convertSha256HexToU32(shaRes);
    });

    const rowSelector = Array(rowTitles.length).fill(0);
    rowSelector[index] = 1;

    const proof = generate_proof(rowTitlesU32, rowContentU32, rowSelector);

    return proof;
  }

  async verifyProof(
    proof: any,
    rowTitle: string,
    rowContent: string,
    fileCommitmentHex: string
  ): Promise<Boolean> {
    const selectedRowHex = get_selected_row(
      convertStringToU32(rowTitle),
      convertStringToU32(rowContent)
    );

    const fileCommitmentU32 = convertSha256HexToU32(fileCommitmentHex);
    const selectedRowU32 = convertSha256HexToU32(selectedRowHex);
    const verifyResult = verify_correct_selector(
      fileCommitmentU32,
      selectedRowU32,
      proof
    );

    return verifyResult;
  }
}

expose(new FileHasher());
