// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // Get the contract factory
  const StorageVictim = await hre.ethers.getContractFactory("StorageVictimAudited");

  // Deploy the contract
  const storageVictim = await StorageVictim.deploy();

  // Wait for the contract to be deployed
  await storageVictim.deployed();

  // Log the contract address
  console.log("Contract deployed to:", storageVictim.address);

  
  // export the addresses
  fs.writeFileSync('scripts/contractAddress.js', `
    export const contractAddress = "${storageVictim.address}"
  `)
}

// Execute the deployment function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
