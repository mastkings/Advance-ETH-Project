// imports
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // set sepolia testnet for deploying smart contract
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/9gO8RVbokTEMFpjvXe_UooQtrZbNJ79V",
      accounts: ["Your Private Key Here"],
    }
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};



