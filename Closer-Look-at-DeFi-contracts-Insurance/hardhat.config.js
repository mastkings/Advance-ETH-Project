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
      accounts: ["9673488150c05380c2d245a4b7926252132489ecc9f19fd3513e926993cce2d1"],
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



