require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { API_URL, PRIVATE_KEY , API_KEY} = process.env;
module.exports = {
  solidity: "0.8.20",

  mocha: {
    timeout: 40000,
  },
  networks: {
    // localhost: {
    //   chainId: 31337
    // },
    mumbai: {
      url: "https://holy-omniscient-meme.matic-testnet.discover.quiknode.pro/844a88e15be1e30d1f855bc750b2401cc57b3089/",
      accounts: ["Private Key here"]
      }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: API_KEY
    },
    plugins: [
      "@nomiclabs/hardhat-etherscan"
    ]
  }
};
