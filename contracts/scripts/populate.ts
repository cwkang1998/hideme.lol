import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x9D1afC5B17c0785061EB1f25BAE3Aa302326c698";
  const contract = await ethers.getContractAt("HideMe", contractAddress);

  const tx = await contract.commitFileHashAndStoreUserCID(
    "0x5261ad65cec0708D0E485507C12F8aEA7218763f",
    "bafybeic42wfr2jqmss2m3bpe7npswra7plnek7v7b5cd2ep476tk7h6dfq",
    BigNumber.from(
      "3172191136508903296159589999272600498272019916881561869495682345435859217851"
    ),
    "test"
  );

  const receipt = await tx.wait();
  console.log(`receipt: ${JSON.stringify(receipt)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
