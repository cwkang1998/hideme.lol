import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("HideMe");
  const contract = await factory.deploy();
  await contract.deployed();

  console.log(`Contract Address: ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0xdBb40e382c826163fe7690973C990bFa4193900D
// npx hardhat verify --network mumbai 0xdBb40e382c826163fe7690973C990bFa4193900D
