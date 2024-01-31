require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { API_URL, PRIVATE_KEY , API_KEY} = process.env;
module.exports = {
  solidity: "0.8.19",

  mocha: {
    timeout: 40000,
  },
  networks: {
    // localhost: {
    //   chainId: 31337
    // },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/9gO8RVbokTEMFpjvXe_UooQtrZbNJ79V",
      accounts: ["9673488150c05380c2d245a4b7926252132489ecc9f19fd3513e926993cce2d1"]
      }
  },
  etherscan: {
    apiKey: {
      ethereumsepolia: API_KEY
    },
    plugins: [
      "@nomiclabs/hardhat-etherscan"
    ]
  }
};
