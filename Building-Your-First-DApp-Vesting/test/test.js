const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vesting Contract", function () {
  let Vesting, vesting, owner, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Vesting = await ethers.getContractFactory("Vesting");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new Vesting contract for each test
    vesting = await Vesting.deploy();
    //await vesting.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await vesting.owner()).to.equal(addr1.address);
    });
  });

  describe("Organizations", function () {
    it("Should create an organization and update total supply", async function () {
      await vesting.createOrganization("TestOrg", addr1.address, 1000);
      const org = await vesting.organizations(addr1.address);
      expect(org.name).to.equal("TestOrg");
      expect(org.tokenAmount).to.equal(1000);
      expect(await vesting.totalSupply()).to.equal(1000);
    });
  });

  describe("Stakeholders", function () {
    it("Should add a new stakeholder and emit an event", async function () {
      // First, allocate tokens to the organization
      await vesting.createOrganization("TestOrg", addr1.address, 1000);
  
      // Now, add a stakeholder using the tokens allocated to the organization
      await expect(vesting.newStakeholder(addr2.address, "Developer", 3600, 500))
        .to.emit(vesting, "NewStakeholder")
        .withArgs(addr2.address, 3600);
      const stakeholder = await vesting.stakeholders(addr2.address);
      expect(stakeholder.position).to.equal("Developer");
      expect(stakeholder.vestingPeriod).to.equal(3600);
      expect(stakeholder.tokenAmount).to.equal(500);
    });
  });
  
  describe("Token Claiming", function () {
    it("Should allow a stakeholder to claim tokens after vesting period", async function () {
      // Allocate tokens to the organization and add a stakeholder
      await vesting.createOrganization("TestOrg", addr1.address, 1000);
      await vesting.newStakeholder(addr1.address, "Developer", 1, 500); // 1 second for the sake of the test
      await vesting.whitelistAddress(addr1.address);
  
      // Fast-forward time
      await ethers.provider.send("evm_increaseTime", [2]); // 2 seconds
      await ethers.provider.send("evm_mine");
  
      // Claim tokens as the stakeholder
      await vesting.connect(addr1).claimToken();
      expect(await vesting.connect(addr1).getClaimedToken()).to.equal(500);
    });
  });
})  