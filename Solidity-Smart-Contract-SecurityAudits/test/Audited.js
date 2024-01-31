// Import required modules
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StorageVictimAudited Tests", function () {
    let storageVictim;
    let testAccount;
    let testAmount;

    beforeEach(async () => {
        // Deploy the StorageVictimAudited contract
        const StorageVictim = await ethers.getContractFactory("StorageVictimAudited");
        storageVictim = await StorageVictim.deploy();
        await storageVictim.deployed();

        // Setup test account and initial amount
        [testAccount] = await ethers.getSigners();
        testAmount = 100;
    });

    it("should correctly store and retrieve the amount", async function () {
        // Store the initial amount
        await storageVictim.store(testAmount);

        // Retrieve the stored amount
        const [retrievedUser, retrievedAmount] = await storageVictim.getStore();

        // Verify the retrieved values
        expect(retrievedUser).to.equal(testAccount.address);
        expect(retrievedAmount).to.equal(testAmount);
    });

    it("should correctly update and retrieve the stored amount", async function () {
        // Store the initial amount
        await storageVictim.store(testAmount);

        // Update and store a new amount
        const updatedAmount = 200;
        await storageVictim.store(updatedAmount);

        // Retrieve the updated amount
        const [retrievedUser, retrievedAmount] = await storageVictim.getStore();

        // Verify the retrieved values
        expect(retrievedUser).to.equal(testAccount.address);
        expect(retrievedAmount).to.equal(updatedAmount);
    });
});
