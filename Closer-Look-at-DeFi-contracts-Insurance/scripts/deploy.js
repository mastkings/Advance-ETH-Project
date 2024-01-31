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
  const Factory = await hre.ethers.getContractFactory("InsuranceFactory");

  // Deploy the contract
  const factory = await Factory.deploy();

  // Wait for the contract to be deployed
  await factory.deployed();

  // Log the contract address
  console.log("Insurance Factory contract deployed to:", factory.address);

  
  // export the addresses
  fs.writeFileSync('scripts/contractAddress.js', `
    export const factoryAddress = "${factory.address}"
  `)
}

// Execute the deployment function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
