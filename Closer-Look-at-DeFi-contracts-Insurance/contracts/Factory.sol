// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Importing external contracts for wallet insurance and collateral protection functionalities.
import "./WalletInsurance.sol";
import "./CollateralProtection.sol";

// Defines a factory contract for creating and managing Wallet Insurance and Collateral Protection contracts for users.
contract InsuranceFactory {
    // Maps user addresses to their respective Wallet Insurance contract addresses.
    mapping(address => address) private walletInsurances;
    // Maps user addresses to their respective Collateral Protection contract addresses.
    mapping(address => address) private collateralProtections;

    // Events to notify when new Wallet Insurance or Collateral Protection contracts are created.
    event WalletInsuranceCreated(address indexed user, address contractAddress);
    event CollateralProtectionCreated(address indexed user, address contractAddress);

    // Creates a new Wallet Insurance contract for the caller with the specified insured amount.
    function createWalletInsurance(uint256 insuredAmount) external {
        require(walletInsurances[msg.sender] == address(0), "Existing insurance contract found");

        walletInsurances[msg.sender] = _deployWalletInsurance(insuredAmount);
        emit WalletInsuranceCreated(msg.sender, walletInsurances[msg.sender]);
    }

    // Creates a new Collateral Protection contract for the caller.
    function createCollateralProtection() external {
        require(collateralProtections[msg.sender] == address(0), "Existing collateral protection found");

        collateralProtections[msg.sender] = _deployCollateralProtection();
        emit CollateralProtectionCreated(msg.sender, collateralProtections[msg.sender]);
    }

    // Retrieves the address of the Wallet Insurance contract associated with the caller.
    function getWalletInsurance() external view returns (address) {
        return walletInsurances[msg.sender];
    }

    // Retrieves the address of the Collateral Protection contract associated with the caller.
    function getCollateralProtection() external view returns (address) {
        return collateralProtections[msg.sender];
    }

    // Internal function to deploy a new Wallet Insurance contract with the specified insured amount.
    function _deployWalletInsurance(uint256 insuredAmount) internal returns (address) {
        WalletInsurance newInsurance = new WalletInsurance(insuredAmount);
        return address(newInsurance);
    }

    // Internal function to deploy a new Collateral Protection contract.
    function _deployCollateralProtection() internal returns (address) {
        CollateralProtection newProtection = new CollateralProtection();
        return address(newProtection);
    }
}
