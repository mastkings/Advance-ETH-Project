require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" }); // This gets the environment variables

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/9gO8RVbokTEMFpjvXe_UooQtrZbNJ79V",
      accounts: ["9673488150c05380c2d245a4b7926252132489ecc9f19fd3513e926993cce2d1"],
    },
  },
};
