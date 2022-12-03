/* eslint-disable node/no-unpublished-import */
import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      accounts: {
        count: 20,
        accountsBalance: "10000000000000000000000000", // 10000ETH
      },
    },
  },
  etherscan: {
    apiKey: {
        goerli: process.env.ETHERSCAN_API_KEY!,
        polygonMumbai: process.env.POLYGONSCAN_API_KEY!,
    }
  }
};

export default config;
