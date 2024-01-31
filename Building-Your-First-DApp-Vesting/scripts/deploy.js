const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

  const vesting = await ethers.deployContract("Vesting");

  await vesting.waitForDeployment();

  console.log(`Vesting deployed to ${vesting.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
