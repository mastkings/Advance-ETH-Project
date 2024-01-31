# Security Audit Project

## Security Audit Report of StorageVictim Contract (OriginalContract.sol.example)

### Summary

The contract is a basic contract used for storing data. It allows users to store a specific amount in a mapping using their address as the identifier. However, there is a vulnerability present in the contract that could result in unintended data being stored.

### Findings

1. Constructor:
The 'StorageVictim()' function in the original contract is not the recommended way to define constructors in Solidity versions 0.7.x and above.

2. Uninitialized Pointer:
In the original contract, the 'Storage' struct variable 'str' was declared without initialization in the store function. This caused the 'user' field to point to the storage address 0, which is the 'owner' address.

3. Access Modifiers:
In the original contract, the 'owner' variable was declared as address, allowing it to be accessed publicly. In the updated contract, the 'owner variable is declared as private, ensuring that it can only be accessed internally.

4. Mapping Visibility:
In the contract, the 'storages' mapping has no restricted visibility to restrict direct external access thereby allowing possible unauthorized modifications to the storage data.

### Recommendations

1. Remove Unused:
To prevent unintended storage of data, it is advisable to remove the unused and uninitialized Storage struct pointer in the 'store' function from the contract. The 'owner' variable, which is not utilized and does not affect the contract's functionality, should be removed from the contract subsequently removing the 'getOwner' function.

2. Mapping Visibility:
In the contract, the 'storages' mapping should be declared as private to restrict direct external access. This prevents unauthorized modifications to the storage data.

3. Store Function and Struct Assignment:

The implementation of the 'store' function in the contract should be updated to introduce an intermediate storage variable 'str' to access and modify the struct properties before assigning them back to the mapping. This will allow additional logic or checks on the struct and improves clarity and explicitness in accessing and modifying its properties.

### Conclusion

The contract, although simple, has a vulnerability that could result in unintended data being stored. However, addressing the issue is straightforward and involves removing the unused pointer, unnecessary variable and updating the 'store' function.

## Testing the Recommended Contract (Audited.sol)

Download the codes by downloading the entire repository which will give you access to other contencts of the repository.In the project directory,  run:

```shell
 npm install
```

After installing the dependences, run the test file by using the following command:

```shell

npx hardhat test
```

To deploy the contract, setup your `env`, paste your wallet private key where necessary and run the following command:

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

## Author

[Samuel Paul](https://github.com/samuepaul)

## License

This project is licensed under the [MIT License](LICENSE).
