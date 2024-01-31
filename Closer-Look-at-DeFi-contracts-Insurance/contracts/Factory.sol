// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./WalletInsurance.sol";
import "./CollateralProtection.sol";

contract InsuranceFactory {
    mapping(address => address) private walletInsurances;
    mapping(address => address) private collateralProtections;

    event WalletInsuranceCreated(address indexed user, address contractAddress);
    event CollateralProtectionCreated(address indexed user, address contractAddress);

    function createWalletInsurance(uint256 insuredAmount) external {
        require(walletInsurances[msg.sender] == address(0), "Existing insurance contract found");

        walletInsurances[msg.sender] = _deployWalletInsurance(insuredAmount);
        emit WalletInsuranceCreated(msg.sender, walletInsurances[msg.sender]);
    }

    function createCollateralProtection() external {
        require(collateralProtections[msg.sender] == address(0), "Existing collateral protection found");

        collateralProtections[msg.sender] = _deployCollateralProtection();
        emit CollateralProtectionCreated(msg.sender, collateralProtections[msg.sender]);
    }

    function getWalletInsurance() external view returns (address) {
        return walletInsurances[msg.sender];
    }

    function getCollateralProtection() external view returns (address) {
        return collateralProtections[msg.sender];
    }

    function _deployWalletInsurance(uint256 insuredAmount) internal returns (address) {
        WalletInsurance newInsurance = new WalletInsurance(insuredAmount);
        return address(newInsurance);
    }

    function _deployCollateralProtection() internal returns (address) {
        CollateralProtection newProtection = new CollateralProtection();
        return address(newProtection);
    }
}
