// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// The StorageVictim contract allows users to store and retrieve value-based information securely.
contract StorageVictim {
    // State variable to hold the contract owner's address.
    address owner;

    // Defines a structure to hold user-specific storage data.
    struct Storage {
        address user;  // The address of the user who stored the information.
        uint256 amount;  // The amount of value or information stored by the user.
    }

    // Mapping to associate user addresses with their respective storage data.
    mapping(address => Storage) storages;

    // Constructor sets the initial owner of the contract to the address deploying it.
    constructor() {
        owner = msg.sender;
    }

    // Allows users to store an amount associated with their address.
    function store(uint256 _amount) public {
        Storage memory str;  // Initializes a temporary Storage struct.
        str.user = msg.sender;  // Assigns the caller's address to the struct.
        str.amount = _amount;  // Assigns the provided amount to the struct.
        storages[msg.sender] = str;  // Maps the caller's address to the constructed Storage struct.
    }

    // Retrieves the stored data for the caller, returning the user's address and stored amount.
    function getStore() public view returns (address, uint256) {
        Storage memory str = storages[msg.sender];  // Fetches the caller's Storage struct from the mapping.
        return (str.user, str.amount);  // Returns the user's address and stored amount.
    }

    // Returns the contract owner's address.
    function getOwner() public view returns (address) {
        return owner;
    }
}
