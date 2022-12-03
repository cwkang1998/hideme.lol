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

// 0x29f54044dE334A69b84228eFf52986678612E280
// npx hardhat verify --network mumbai 0x29f54044dE334A69b84228eFf52986678612E280
