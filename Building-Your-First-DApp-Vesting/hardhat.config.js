require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" }); // This gets the environment variables

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/9gO8RVbokTEMFpjvXe_UooQtrZbNJ79V",
      accounts: ["Your Private key here"],
    },
  },
};
