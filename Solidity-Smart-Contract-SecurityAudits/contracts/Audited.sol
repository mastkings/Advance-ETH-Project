// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// The StorageVictimAudited contract provides a secure way for users to store and retrieve numeric values associated with their Ethereum addresses.
contract StorageVictimAudited {

    // Defines a structure to hold an address and an associated numeric value.
    struct Storage {
        address user;   // The address of the user.
        uint256 amount; // The numeric value associated with the user address.
    }

    // A private mapping that associates each user's address with their Storage data.
    mapping(address => Storage) private storages;

    // Allows a user to store a specified numeric value associated with their Ethereum address.
    function store(uint256 _amount) public {
        Storage storage str = storages[msg.sender]; // Accesses or initializes the Storage struct for the calling address.
        str.user = msg.sender;  // Sets the user property to the calling address.
        str.amount = _amount;   // Sets the amount property to the specified numeric value.
    }

    // Retrieves the stored information (user address and amount) for the calling address.
    function getStore() public view returns (address, uint256) {
        Storage memory str = storages[msg.sender]; // Retrieves the Storage struct for the calling address.
        return (str.user, str.amount); // Returns the user address and associated numeric value.
    }
}
