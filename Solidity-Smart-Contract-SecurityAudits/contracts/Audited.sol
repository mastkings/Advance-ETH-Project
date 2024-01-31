// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract StorageVictimAudited {

   // Struct to store user and amount
   struct Storage {
     address user;
     uint256 amount;
   }

   // Mapping to store storage information for each address
   mapping(address => Storage) private storages;

   // Function to store the given amount in the storage mapping for the calling address
   function store(uint256 _amount) public {
     Storage storage str = storages[msg.sender];
     str.user = msg.sender;
     str.amount = _amount;
   }

   // Function to retrieve the stored information for the calling address
   function getStore() public view returns (address, uint) {       
     Storage memory str = storages[msg.sender];       
     return (str.user, str.amount);
   }
}